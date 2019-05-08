import { Module } from '@nestjs/common'
import { PasswordModule } from './password/password.module'
import { JwtModule } from './jwt/jwt.module'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { AuthResolver } from './auth.resolver'
import { PasswordManagerModule } from './password-manager/password-manager.module'
import { EmailVerifierModule } from './email-verifier/email-verifier.module'
import { PermissionsModule } from './permissions/permissions.module'

@Module({
  imports: [
    PasswordModule,
    JwtModule,
    UsersModule,
    PasswordManagerModule,
    EmailVerifierModule,
    PermissionsModule,
  ],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
