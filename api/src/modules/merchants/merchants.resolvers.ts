import { Resolver, Context, Query, Mutation, Args } from '@nestjs/graphql'
import { UseGuards, UnauthorizedException } from '@nestjs/common'
import { SignedInGuard } from '../auth/guards/SignedInGuard'
import { InputError } from '../../errors/InputError'
import { GraphqlContext } from '../../types/app/GraphqlContext'
import { Merchant } from './Merchants.entity'
import { MerchantsService } from './merchants.service'
import { ResellersService } from '../resellers/resellers.service'

@Resolver('Merchant')
export class MerchantResolver {
  constructor(
    private merchants: MerchantsService,
    private resellers: ResellersService,
  ) {}

  @Query('merchants')
  @UseGuards(SignedInGuard)
  async getMerchants(): Promise<Merchant[]> {
    return await this.merchants.getAll()
  }

  @Query()
  async getMerchantById(@Args('id') id: string): Promise<Merchant> {
    return await this.merchants.getById(id)
  }

  @Query()
  async getMerchantByReseller(
    @Args('resellerId') resellerId: string,
  ): Promise<Merchant[]> {
    return await this.merchants.getByReseller(resellerId)
  }

  @Mutation()
  @UseGuards(SignedInGuard)
  async createMerchant(
    @Context() { user }: GraphqlContext,
    @Args('input')
    { name, resellerId }: any,
  ): Promise<Merchant> {
    try {
      const reseller = await this.resellers.getById(resellerId)

      // verify that the reseller is valid and that the reseller belongs to the logged-in user
      if (!reseller) {
        throw new InputError(`Reseller #${resellerId} does not exist`)
      } else if (reseller.user.id !== user.id) {
        throw new UnauthorizedException()
      }

      return this.merchants.create({
        name,
        reseller,
      })
    } catch (error) {
      if (error instanceof InputError) {
        throw new InputError(error.message)
      } else {
        throw error
      }
    }
  }

  @Mutation()
  @UseGuards(SignedInGuard)
  async updateMerchant(
    @Args('id') id: string,
    @Args('input')
    { name }: any,
  ): Promise<Merchant> {
    return await this.merchants.update(id, {
      name,
    })
  }
}
