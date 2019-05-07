import { Module } from '@nestjs/common';
import { Reseller } from './resellers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResellerResolver } from './resellers.resolver';
import { ResellersService } from './resellers.service';
import { Merchant } from '../merchants/merchants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reseller]), Merchant],
  providers: [ResellerResolver, ResellersService],
  exports: [ResellersService]
})
export class ResellersModule {}
