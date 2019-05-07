import {
  Resolver,
  Context,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { SignedInGuard } from '../auth/guards/SignedInGuard'
import { UsersService } from './users.service'
import { InputError } from '../../errors/InputError'
import { UserInputError } from 'apollo-server-core'
import { GraphqlContext } from '../../types/app/GraphqlContext'
import { UserInput, Permission, User } from '../../types/Api'
import { PermissionsService } from '../auth/permissions/permissions.service'

@Resolver('User')
export class UserResolver {
  constructor(
    private users: UsersService,
    private permissions: PermissionsService,
  ) {}

  @Query('users')
  @UseGuards(SignedInGuard)
  async getUsers(): Promise<User[]> {
    return await this.users.getAll()
  }

  @Query()
  async getUserById(@Args('id') id: string): Promise<User> {
    return await this.users.getById(id)
  }

  @Query()
  @UseGuards(SignedInGuard)
  async signedInUser(@Context() { user }: GraphqlContext): Promise<User> {
    return user
  }

  @Mutation()
  async createUser(@Args('input')
  {
    email,
    firstName,
    lastName,
  }: UserInput): Promise<User> {
    try {
      return this.users.create({
        email,
        profile: { firstName, lastName },
      })
    } catch (error) {
      if (error instanceof InputError) {
        throw new UserInputError(error.message)
      } else {
        throw error
      }
    }
  }

  @Mutation()
  @UseGuards(SignedInGuard)
  async modifyUser(
    @Args('id') id: string,
    @Args('input')
    { email, firstName, lastName }: UserInput,
  ): Promise<User> {
    return await this.users.update(id, {
      email,
      profile: { firstName, lastName },
    })
  }

  @Mutation()
  @UseGuards(SignedInGuard)
  async deactivateUser(@Args('id') id: string): Promise<User> {
    return await this.users.update(id, { active: false })
  }

  @Mutation()
  @UseGuards(SignedInGuard)
  async reactivateUser(@Args('id') id: string): Promise<User> {
    return await this.users.update(id, { active: true })
  }

  @ResolveProperty('permissions')
  async getPermissions(@Parent() { id }: User): Promise<Permission[]> {
    return this.permissions.getForUser(id)
  }
}
