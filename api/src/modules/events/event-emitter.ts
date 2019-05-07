import { Injectable } from '@nestjs/common'
import { EventEmitter as NodeEventEmitter } from 'events'
import { Event } from './event'

@Injectable()
export class EventEmitter {
  private nodeEvents: NodeEventEmitter

  constructor() {
    this.nodeEvents = new NodeEventEmitter()
  }

  emit<T extends Event>(event: T, payload: T['payload']): void {
    this.nodeEvents.emit(event.constructor.name, { payload })
  }

  on<T extends Event>(
    event: T,
    callback: (payload: T['payload']) => void,
  ): void {
    const eventCallback = ({ payload }: { payload: T['payload'] }): void => {
      callback(payload)
    }
    this.nodeEvents.on(event.constructor.name, eventCallback)
  }
}
