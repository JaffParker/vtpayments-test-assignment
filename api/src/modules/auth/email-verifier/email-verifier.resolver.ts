import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { EmailVerifierService } from './email-verifier.service'
import { EmailConfirmation } from '../../../types/Api'

@Resolver()
export class EmailVerifierResolver {
  constructor(private emailVerifier: EmailVerifierService) {}

  @Mutation()
  async confirmEmail(@Args('token') token: string): Promise<EmailConfirmation> {
    return await this.emailVerifier.verifyByToken(token)
  }

  @Mutation()
  async resendConfirmationEmail(@Args('userId') userId: string): Promise<void> {
    await this.emailVerifier.resendEmailForUser(userId)
  }
}
