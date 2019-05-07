import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users.entity'
import { UsersService } from './users.service'
import { UserResolver } from './users.resolver'
import { EventEmitter } from '../events/event-emitter'
import { EmailConfirmed } from '../auth/email-verifier/email-verifier.events'
import { PermissionsModule } from '../auth/permissions/permissions.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), PermissionsModule],
  providers: [UsersService, UserResolver],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(private users: UsersService, private events: EventEmitter) {}

  onModuleInit(): void {
    this.events.on(
      new EmailConfirmed(),
      this.setEmailConfirmedForUser.bind(this),
    )
  }

  private async setEmailConfirmedForUser(userId: string): Promise<void> {
    await this.users.update(userId, { emailConfirmed: true })
  }
}
