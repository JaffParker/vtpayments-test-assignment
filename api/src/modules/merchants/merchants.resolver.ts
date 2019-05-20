import {
  Resolver,
  Mutation,
  Args,
} from '@nestjs/graphql'
import { MerchantsService } from './merchants.service'
import { MerchantInput, Merchant } from '../../types/Api'

@Resolver('Merchant')
export class MerchantResolver {
  constructor(
    private merchants: MerchantsService,
  ) { }

  @Mutation()
  async createMerchant(@Args('input')
  {
    name,
    isReseller,
    resellerId,
    contactInfo,
  }: MerchantInput): Promise<Merchant> {
    return this.merchants.create({
      name,
      isReseller,
      resellerId,
      contactInfo
    })
  }
}
