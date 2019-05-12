import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Reseller } from './resellers.entity'
import { ResellersService } from './resellers.service'
import { ResellersResolver } from './resellers.resolver'
import { Merchant } from '../merchants/merchants.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Reseller]), Merchant],
  providers: [ResellersResolver, ResellersService],
  exports: [ResellersService],
})
export class ResellersModule {}
