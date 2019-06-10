import { Event } from '../events/event'
import { Merchant } from './merchants.entity'

export class MerchantCreated implements Event {
  payload: Merchant
}
