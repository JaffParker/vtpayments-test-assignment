import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Reseller } from './resellers.entity'
import { InputError } from '../../errors/InputError'
import { ResellerErrors } from 'src/types/Errors/ResellerErrors'

type CreateResellerInput = Pick<Reseller, 'name' | 'user'>

@Injectable()
export class ResellersService {
  constructor(
    @InjectRepository(Reseller) private resellerRepo: Repository<Reseller>,
  ) {}

  async getAll(): Promise<Reseller[]> {
    return await this.resellerRepo.find()
  }

  async getById(id: string): Promise<Reseller> {
    return await this.resellerRepo.findOne(id, {
      relations: ['user'],
    })
  }

  async getByName(name: string): Promise<Reseller> {
    return await this.resellerRepo.findOne({ name })
  }

  async resellerExists(params: Partial<Reseller>): Promise<boolean> {
    return (await this.resellerRepo.count(params)) > 0
  }

  async getByUser(userId: string): Promise<Reseller[]> {
    return await this.resellerRepo.find({
      user: { id: userId },
    })
  }

  async create(input: CreateResellerInput): Promise<Reseller> {
    if (await this.resellerExists({ name: input.name }))
      throw new InputError(ResellerErrors.DuplicateReseller)

    return await this.resellerRepo.save(this.resellerRepo.create(input))
  }

  async update(id: string, input: Partial<Reseller>): Promise<Reseller> {
    const reseller = await this.getById(id)

    for (let key in input) {
      if (input.hasOwnProperty(key)) {
        reseller[key] = input[key]
      }
    }

    return this.resellerRepo.save(reseller)
  }
}
