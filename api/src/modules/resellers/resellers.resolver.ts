import {
  Resolver,
  Context,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql'
import { UseGuards, UnauthorizedException } from '@nestjs/common'
import { SignedInGuard } from '../auth/guards/SignedInGuard'
import { InputError } from '../../errors/InputError'
import { UserInputError } from 'apollo-server-core'
import { GraphqlContext } from '../../types/app/GraphqlContext'
import { UserInput, Permission, User } from '../../types/Api'
import { PermissionsService } from '../auth/permissions/permissions.service'
import { Reseller } from './Resellers.entity'
import { ResellersService } from './resellers.service'

@Resolver('Reseller')
export class ResellerResolver {
  constructor(
    private resellers: ResellersService,
    private permissions: PermissionsService,
  ) {}

  @Query('resellers')
  @UseGuards(SignedInGuard)
  async getUsers(): Promise<Reseller[]> {
    return await this.resellers.getAll()
  }

  @Query()
  async getResellerById(@Args('id') id: string): Promise<Reseller> {
    return await this.resellers.getById(id)
  }

  @Query()
  async getResellersByUser(
    @Args('userId') userId: string,
  ): Promise<Reseller[]> {
    return await this.resellers.getByUser(userId)
  }

  @Query()
  @UseGuards(SignedInGuard)
  async getLoggedInUserResellers(@Context() { user }: GraphqlContext): Promise<
    Reseller[]
  > {
    return await this.resellers.getByUser(user.id)
  }

  @Mutation()
  @UseGuards(SignedInGuard)
  async createReseller(
    @Context() { user }: GraphqlContext,
    @Args('input')
    { name }: any,
  ): Promise<Reseller> {
    try {
      return this.resellers.create({
        name,
        user,
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
  async modifyReseller(
    @Context() { user }: GraphqlContext,
    @Args('id') id: string,
    @Args('input')
    { name }: any,
  ): Promise<Reseller> {
    const reseller = await this.resellers.getById(id)

    if (!reseller) {
      throw new InputError('Reseller not found')
    }

    if (reseller.user.id !== user.id) {
      throw new UnauthorizedException()
    }

    return await this.resellers.update(id, {
      name,
      user,
    })
  }
}
