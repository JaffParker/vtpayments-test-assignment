import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { PasswordManagerService } from './password-manager.service'
import { SetUserPasswordInput } from '../../../types/Api'

@Resolver()
export class PasswordManagerResolver {
  constructor(private passwordManager: PasswordManagerService) {}

  @Mutation()
  async setUserPassword(@Args('input')
  {
    id,
    password,
  }: SetUserPasswordInput): Promise<void> {
    await this.passwordManager.setPasswordForUser(id, password)
  }
}
