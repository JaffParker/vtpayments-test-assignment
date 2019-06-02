import {
    Resolver,
    Mutation,
    Args,
    Query
} from '@nestjs/graphql'
import { MerchantsService } from './merchants.service'
import { InputError } from '../../errors/InputError'
import { UserInputError } from 'apollo-server-core'
import {Merchant} from "./merchants.entity";



@Resolver('Merchant')
export class MerchantsResolver {
    constructor(
        private merchants: MerchantsService
    ) {
    }

    @Query()
    async getAllMerchantsByUser(@Args('userId') userId: string): Promise<Merchant[]> {
        return await this.merchants.getAllMerchantsByUser(userId)
    }
    @Query()
    async getAllResellersByUser(@Args('userId') userId: string): Promise<Merchant[]> {
        return await this.merchants.getAllResellersByUser(userId)
    }
    @Query()
    async getMerchantsByUser(@Args('userId') userId: string, @Args('merchantId') merchantId: string): Promise<Merchant> {
        console.log("getMerchantsByUser")
        console.log(userId)
        console.log(merchantId)
        let result =  await this.merchants.getMerchantsByUser(userId, merchantId)
        console.log(result)
        return result
    }

    @Mutation()
    async createMerchant(
        @Args('input'){
            name,
            userId,
            isReseller,
            resellerId,
            phone,
            country,
            state,
            city,
            address,
            zipCode
        }
    ): Promise<Merchant> {
        try {
            return this.merchants.createMerchant({
                userId,
                name,
                isReseller,
                resellerId,
                phone,
                country,
                state,
                city,
                address,
                zipCode,
            })
        } catch (error) {
            if (error instanceof InputError) {
                throw new UserInputError(error.message)
            } else {
                throw error
            }
        }
    };

    @Mutation()
    async createReseller(
        @Args('input'){
            name,
            userId,
            isReseller,
            phone,
            country,
            state,
            city,
            address,
            zipCode
        }
    ): Promise<Merchant> {
        try {
            return this.merchants.createReseller({
                name,
                userId,
                isReseller,
                phone,
                country,
                state,
                city,
                address,
                zipCode,
            })
        } catch (error) {
            if (error instanceof InputError) {
                throw new UserInputError(error.message)
            } else {
                throw error
            }
        }

    };
}
