import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EmailConfirmationToken } from './email-confirmation-tokens.entity'
import { EmailVerifierService } from './email-verifier.service'
import { EmailVerifierResolver } from './email-verifier.resolver'
import { EventEmitter } from '../../events/event-emitter'
import { UserCreated } from '../../users/users.events'
import { User } from '../../users/users.entity'
import { UsersModule } from '../../users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([EmailConfirmationToken]), UsersModule],
  providers: [EmailVerifierService, EmailVerifierResolver],
})
export class EmailVerifierModule implements OnModuleInit {
  constructor(
    private events: EventEmitter,
    private tokens: EmailVerifierService,
  ) {}

  onModuleInit(): void {
    this.events.on(new UserCreated(), this.createTokenForUser.bind(this))
  }

  async createTokenForUser(user: User): Promise<void> {
    this.tokens.createToken(user)
  }
}
