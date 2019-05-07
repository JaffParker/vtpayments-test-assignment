import { Event } from '../../events/event'

export class EmailConfirmed implements Event {
  payload: string
}
