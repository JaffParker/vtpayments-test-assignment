import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from './jwt/jwt.service'
import { PasswordService } from './password/password.service'
import { User } from '../users/users.entity'
import { TokenExpiredError, TokenInvalidError } from './jwt/jwt.errors'
import { InputError } from '../../errors/InputError'
import { SignInErrors } from '../../types/Errors/SignInErrors'
import { TokenErrors } from '../../types/Errors/TokenErrors'

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
    private password: PasswordService,
  ) {}

  async getUser(email: string, password: string): Promise<User> {
    const user = await this.users.getByEmail(email)

    if (!user) {
      throw new InputError(SignInErrors.UserNotFound)
    }
    if (!user.password) {
      throw new InputError(SignInErrors.PasswordNotSet)
    }
    if (!(await this.password.compare(user.password, password))) {
      throw new InputError(SignInErrors.PasswordInvalid)
    }

    return user
  }

  async getTokenForUser(user: User): Promise<string> {
    return await this.jwt.createToken(user.id)
  }

  async getUserByToken(token: string): Promise<User> {
    try {
      const tokenPayload = await this.jwt.parseToken(token)

      return await this.users.getById(tokenPayload.sub)
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new InputError(TokenErrors.TokenExpired)
      } else if (error instanceof TokenInvalidError) {
        throw new InputError(TokenErrors.TokenInvalid)
      } else {
        throw error
      }
    }
  }
}
