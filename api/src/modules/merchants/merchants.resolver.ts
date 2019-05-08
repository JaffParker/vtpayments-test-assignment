import { Resolver, Context, Query, Mutation, Args } from '@nestjs/graphql'
import { UseGuards, UnauthorizedException } from '@nestjs/common'
import { SignedInGuard } from '../auth/guards/SignedInGuard'
import { InputError } from '../../errors/InputError'
import { UserInputError } from 'apollo-server-core'
import { GraphqlContext } from '../../types/app/GraphqlContext'
import { PermissionsService } from '../auth/permissions/permissions.service'
import { Merchant } from './Merchants.entity'
import { MerchantsService } from './merchants.service'
import { ResellersService } from '../resellers/resellers.service'
import { UsersService } from '../users/users.service'
import { MerchantErrors } from 'src/types/Errors/MerchantErrors'

@Resolver('Merchant')
export class MerchantResolver {
  constructor(
    private users: UsersService,
    private merchants: MerchantsService,
    private resellers: ResellersService,
  ) {}

  @Query('merchants')
  @UseGuards(SignedInGuard)
  async getUsers(): Promise<Merchant[]> {
    return await this.merchants.getAll()
  }

  @Query()
  async getMerchantById(@Args('id') id: string): Promise<Merchant> {
    return await this.merchants.getById(id)
  }

  @Query()
  @UseGuards(SignedInGuard)
  async getLoggedInUserMerchants(@Context() { user }: GraphqlContext): Promise<
    Merchant[]
  > {
    return await this.merchants.getByUser(user.id)
  }

  @Mutation()
  @UseGuards(SignedInGuard)
  async createMerchant(
    @Context() { user }: GraphqlContext,
    @Args('input')
    { name, resellerId, merchantEmail }: any,
  ): Promise<Merchant> {
    try {
      const merchantUser = await this.users.getByEmail(merchantEmail)
      if (!merchantUser) {
        throw new InputError(MerchantErrors.UserNotFound)
      }

      const reseller = await this.resellers.getById(resellerId)
      if (!reseller) {
        throw new InputError(`Reseller #${resellerId} does not exist`)
      }

      // Only the reseller himself can create a new merchant
      if (reseller.user.id !== user.id) {
        throw new UnauthorizedException()
      }

      return this.merchants.create({
        name,
        reseller,
        user: merchantUser,
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
  async modifyMerchant(
    @Context() { user }: GraphqlContext,
    @Args('id') id: string,
    @Args('input')
    { name }: any,
  ): Promise<Merchant> {
    return await this.merchants.update(id, {
      name,
    })
  }
}
