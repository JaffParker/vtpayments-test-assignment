import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EmailConfirmationToken } from './email-confirmation-tokens.entity'
import { Repository } from 'typeorm'
import { MailerService } from '../../mail/mailer.service'
import { User } from '../../users/users.entity'
import { AuthErrors } from '../../../types/Errors/AuthErrors'
import { InputError } from '../../../errors/InputError'
import { EventEmitter } from '../../events/event-emitter'
import { EmailConfirmed } from './email-verifier.events'
import { UsersService } from '../../users/users.service'

@Injectable()
export class EmailVerifierService {
  constructor(
    @InjectRepository(EmailConfirmationToken)
    private tokensRepo: Repository<EmailConfirmationToken>,
    private users: UsersService,
    private mailer: MailerService,
    private events: EventEmitter,
  ) {}

  async createToken(user: User): Promise<void> {
    const tokenEntity = await this.tokensRepo.save(
      this.tokensRepo.create({
        userId: user.id,
        email: user.email,
      }),
    )

    await this.emailToken(user, tokenEntity)
  }

  async resendEmailForUser(userId: string): Promise<void> {
    const tokenEntity = await this.tokensRepo.findOne({ userId })
    const user = await this.users.getById(userId)

    await this.emailToken(user, tokenEntity)
  }

  async emailToken(
    user: User,
    { token }: EmailConfirmationToken,
  ): Promise<void> {
    await this.mailer.send('emailConfirmation', user.email, {
      user,
      token,
    })
  }

  async verifyByToken(token: string): Promise<EmailConfirmationToken> {
    const tokenEntity = await this.tokensRepo.findOne({ token })

    if (tokenEntity) {
      await this.deleteToken(token)
      this.events.emit(new EmailConfirmed(), tokenEntity.userId)

      return tokenEntity
    }

    throw new InputError(AuthErrors.EmailTokenNotFound)
  }

  async deleteToken(token: string): Promise<void> {
    await this.tokensRepo.delete({ token })
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.tokensRepo.delete({ userId })
  }
}
