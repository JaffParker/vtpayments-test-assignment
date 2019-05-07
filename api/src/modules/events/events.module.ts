import { Module, Global } from '@nestjs/common'
import { EventEmitter } from './event-emitter'

@Global()
@Module({
  providers: [EventEmitter],
  exports: [EventEmitter],
})
export class EventsModule {}
