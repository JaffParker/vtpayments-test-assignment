import { Resolver, Context, Query, Mutation, Args } from '@nestjs/graphql'
import { UseGuards, UnauthorizedException } from '@nestjs/common'
import { SignedInGuard } from '../auth/guards/SignedInGuard'
import { InputError } from '../../errors/InputError'
import { UserInputError } from 'apollo-server-core'
import { GraphqlContext } from '../../types/app/GraphqlContext'
import { Reseller } from './Resellers.entity'
import { ResellersService } from './resellers.service'

@Resolver('Reseller')
export class ResellersResolver {
  constructor(private resellers: ResellersService) {}

  @Query('resellers')
  @UseGuards(SignedInGuard)
  async getResellers(): Promise<Reseller[]> {
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
  async updateReseller(
    @Context() { user }: GraphqlContext,
    @Args('id') id: string,
    @Args('input')
    { name }: any,
  ): Promise<Reseller> {
    const reseller = await this.resellers.getById(id)

    // verify that the reseller exists and that they belong to the logged-in user
    if (!reseller) {
      throw new InputError('Invalid Reseller Id. Reseller not found.')
    } else if (reseller.user.id !== user.id) {
      throw new UnauthorizedException()
    }

    return await this.resellers.update(id, {
      name,
      user,
    })
  }
}
