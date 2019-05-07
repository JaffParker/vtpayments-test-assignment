import { Module } from '@nestjs/common'
import { PasswordManagerService } from './password-manager.service'
import { PasswordManagerResolver } from './password-manager.resolver'
import { UsersModule } from '../../../modules/users/users.module'
import { PasswordModule } from '../password/password.module'

@Module({
  imports: [UsersModule, PasswordModule],
  providers: [PasswordManagerService, PasswordManagerResolver],
})
export class PasswordManagerModule {}
