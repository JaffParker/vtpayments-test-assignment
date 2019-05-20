import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Merchant } from './merchants.entity'
import { InputError } from '../../errors/InputError'
import { DataErrors } from '../../types/Errors/DataErrors'
import { EventEmitter } from '../events/event-emitter'
import { MerchantCreated } from './merchants.events'

type CreateMerchantInput = Pick<Merchant, 'name' | 'isReseller' | 'resellerId' | 'contactInfo'>

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant) private merchantRepo: Repository<Merchant>,
    private events: EventEmitter,
  ) { }

  async getAll(): Promise<Merchant[]> {
    return await this.merchantRepo.find()
  }

  async getById(id: string): Promise<Merchant> {
    return await this.merchantRepo.findOne(id)
  }

  async merchantExists(params: Partial<Merchant>): Promise<boolean> {
    return (await this.merchantRepo.count(params)) > 0
  }

  async create(input: CreateMerchantInput): Promise<Merchant> {
    if (await this.merchantExists({ name: input.name }))
      throw new InputError(DataErrors.DuplicateEntry)

    const merchant = await this.merchantRepo.save(this.merchantRepo.create(input))
    this.events.emit(new MerchantCreated(), merchant)

    return merchant
  }
}
