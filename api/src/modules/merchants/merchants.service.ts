import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {EventEmitter} from "../events/event-emitter";
import { InjectRepository } from '@nestjs/typeorm'
import {Merchant} from "./merchants.entity";
import {InputError} from "../../errors/InputError";
import {MerchantCreated} from "./merchants.event";
import {MerchantErrors} from "../../types/Errors/MerchantErrors";


type CreateMerchantInput = Pick<Merchant, 'name'|'userId'|'resellerId'|'isReseller'|'phone'|'country'|'state'|'city'|'address'|'zipCode'>
type CreateResellerInput = Pick<Merchant, 'name'|'userId'|'isReseller'|'phone'|'country'|'state'|'city'|'address'|'zipCode'>

@Injectable()
export class MerchantsService {
    constructor(
        @InjectRepository(Merchant) private merchantRepo: Repository<Merchant>,
        private events: EventEmitter,
    ) {}

    async entryExists(params: Partial<Merchant>): Promise<boolean> {
        return (await this.merchantRepo.count(params)) > 0
    }

    async createMerchant(input: CreateMerchantInput): Promise<Merchant> {
        if (await this.entryExists({ name: input.name, isReseller: false }))
            throw new InputError(MerchantErrors.DuplicateMerchant)
        const merchant = await this.merchantRepo.save(this.merchantRepo.create(input))
        this.events.emit(new MerchantCreated(), merchant)
        return merchant
    }

    async createReseller(input: CreateResellerInput): Promise<Merchant>{
        if (await this.entryExists({ name: input.name, isReseller: true }))
            throw new InputError(MerchantErrors.DuplicateReseller)
        const merchant = await this.merchantRepo.save(this.merchantRepo.create(input))
        this.events.emit(new MerchantCreated(), merchant)
        return merchant
    }


    async getAllResellers(): Promise<Merchant[]> {
        return await this.merchantRepo.find({ where: { isReseller: true } })
    }

    async getAllMerchants(): Promise<Merchant[]> {
        return await this.merchantRepo.find({ where: { isReseller: false } })
    }

    async getAllResellersByUser(userId): Promise<Merchant[]> {
        return await this.merchantRepo.find({ where: { isReseller: true, userId: userId } })
    }

    async getAllMerchantsByUser(userId): Promise<Merchant[]> {
        return await this.merchantRepo.find({ where: { isReseller: false, userId:userId } })
    }

    async getById(id: string): Promise<Merchant> {
        return await this.merchantRepo.findOne(id)
    }

}
