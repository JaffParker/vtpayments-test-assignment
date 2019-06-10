import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Merchant } from './merchants.entity'
import { MerchantsService } from './merchants.service'
import { MerchantResolver } from './merchants.resolver'
import { EventEmitter } from '../events/event-emitter'

@Module({
  imports: [TypeOrmModule.forFeature([Merchant])],
  providers: [MerchantsService, MerchantResolver],
  exports: [MerchantsService],
})
export class MerchantsModule implements OnModuleInit {
  constructor(private merchants: MerchantsService, private events: EventEmitter) { }

  onModuleInit(): void {
  }

}
