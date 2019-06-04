import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {EventEmitter} from "../events/event-emitter";
import { InjectRepository } from '@nestjs/typeorm'
import {Merchant} from "./merchants.entity";
import {InputError} from "../../errors/InputError";
import {MerchantCreated} from "./merchants.event";
import {MerchantErrors} from "../../types/Errors/MerchantErrors";

type addressInput = 'phone'|'country'|'state'|'city'|'address'|'zipCode'
type baseMerchant = 'name'|'userId'

type CreateMerchantInput = Pick<Merchant, baseMerchant|'resellerId'|'isReseller'| addressInput>
type CreateResellerInput = Pick<Merchant, baseMerchant |'isReseller'|addressInput>
type EditMerchantInput = Pick<Merchant, baseMerchant | 'id' | 'resellerId'|addressInput>
type EditResellerInput = Pick<Merchant, baseMerchant | 'id' | addressInput>

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

    async editMerchant(input: EditMerchantInput): Promise<Merchant> {
        try{
            let id= input.id
            await this.merchantRepo.update(id, input)
            let merchant = await this.merchantRepo.findOne({where:{id:input.id}})
            this.events.emit(new MerchantCreated(), merchant)
            return merchant
        }
        catch(error){
            throw new InputError(MerchantErrors.ErrorUpdate)
        }
    }

    async editReseller(input: EditResellerInput): Promise<Merchant>{
        try{
            let id= input.id
            await this.merchantRepo.update(id, input)
            let merchant = await this.merchantRepo.findOne({where:{id:input.id}})
            this.events.emit(new MerchantCreated(), merchant)
            return merchant
        }
        catch(error){
            throw new InputError(MerchantErrors.ErrorUpdate)
        }
    }

    async getAllResellers(): Promise<Merchant[]> {
        return await this.merchantRepo.find({ where: { isReseller: true } })
    }

    async getAllMerchants(): Promise<Merchant[]> {
        return await this.merchantRepo.find({ where: { isReseller: false } })
    }

    async getMerchantsByUser(userId, merchantId): Promise<Merchant> {
        return await this.merchantRepo.findOne({ where: { id: merchantId, userId: userId } })
    }

    async getResellersByUser(userId, resellerId): Promise<Merchant>{
        return await this.merchantRepo.findOne({ where: { id: resellerId, userId: userId } })
    }

    async getAllResellersByUser(userId): Promise<Merchant[]> {
        let merchant = await this.merchantRepo.find({ where: { isReseller: true, userId: userId } })
        return merchant
    }

    async getAllMerchantsByUser(userId): Promise<Merchant[]> {
        return await this.merchantRepo.find({ where: { isReseller: false, userId:userId } })
    }

    async getById(id: string): Promise<Merchant> {
        return await this.merchantRepo.findOne(id)
    }
}
