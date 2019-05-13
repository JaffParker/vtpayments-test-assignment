import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Merchant } from './merchants.entity'
import { MerchantsService } from './merchants.service'
import { MerchantResolver } from './merchants.resolvers'
import { ResellersService } from '../resellers/resellers.service'
import { ResellersModule } from '../resellers/resellers.module'

@Module({
  imports: [TypeOrmModule.forFeature([Merchant]), ResellersModule],
  providers: [MerchantResolver, MerchantsService, ResellersService],
})
export class MerchantsModule {}
