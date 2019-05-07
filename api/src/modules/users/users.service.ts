import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './users.entity'
import { InputError } from '../../errors/InputError'
import { SignUpErrors } from '../../types/Errors/SignUpErrors'
import { EventEmitter } from '../events/event-emitter'
import { UserCreated } from './users.events'

type CreateUserInput = Pick<User, 'email' | 'profile'>

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private events: EventEmitter,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepo.find()
  }

  async getById(id: string): Promise<User> {
    return await this.userRepo.findOne(id)
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepo.findOne({ email })
  }

  async userExists(params: Partial<User>): Promise<boolean> {
    return (await this.userRepo.count(params)) > 0
  }

  async create(input: CreateUserInput): Promise<User> {
    if (await this.userExists({ email: input.email }))
      throw new InputError(SignUpErrors.DuplicateUser)

    const user = await this.userRepo.save(this.userRepo.create(input))
    this.events.emit(new UserCreated(), user)

    return user
  }

  async update(id: string, input: Partial<User>): Promise<User> {
    const user = await this.getById(id)

    for (let key in input) {
      if (input.hasOwnProperty(key)) {
        user[key] = input[key]
      }
    }

    return this.userRepo.save(user)
  }
}
