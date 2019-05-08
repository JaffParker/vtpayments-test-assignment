import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Merchant } from './merchants.entity'
import { MerchantsService } from './merchants.service'
import { MerchantResolver } from './merchants.resolver'
import { ResellersService } from '../resellers/resellers.service'
import { ResellersModule } from '../resellers/resellers.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Merchant]), ResellersModule, UsersModule],
  providers: [
    MerchantResolver,
    MerchantsService,
    ResellersService,
    UsersModule,
  ],
})
export class MerchantsModule {}
