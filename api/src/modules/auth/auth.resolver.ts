import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { InputError } from '../../errors/InputError'
import { UserInputError, ApolloError } from 'apollo-server-core'
import { Logger } from '@nestjs/common'
import { SignInInput, Auth } from '../../types/Api'

@Resolver('Auth')
export class AuthResolver {
  private logger: Logger

  constructor(private auth: AuthService) {
    this.logger = new Logger('AuthResolver')
  }

  @Mutation()
  async signIn(@Args('input') { email, password }: SignInInput): Promise<Auth> {
    try {
      const user = await this.auth.getUser(email, password)
      const token = await this.auth.getTokenForUser(user)

      return { user, token }
    } catch (error) {
      if (error instanceof InputError) {
        throw new UserInputError(error.message)
      } else {
        this.logger.error(error)
        throw new ApolloError(error)
      }
    }
  }
}
