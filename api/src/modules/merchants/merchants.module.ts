import { Module } from '@nestjs/common';
import {MerchantsResolver} from "./merchants.resolver";
import {MerchantsService} from "./merchants.service";
import { TypeOrmModule } from '@nestjs/typeorm'
import {Merchant} from "./merchants.entity";



@Module({
    imports: [TypeOrmModule.forFeature([Merchant])],
    providers: [MerchantsService, MerchantsResolver],
    exports: [MerchantsService],
})
export class MerchantsModule {
}
