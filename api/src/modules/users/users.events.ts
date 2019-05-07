import { Event } from '../events/event'
import { User } from './users.entity'

export class UserCreated implements Event {
  payload: User
}
