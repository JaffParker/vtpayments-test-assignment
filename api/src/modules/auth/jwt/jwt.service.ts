import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { ConfigService } from 'nestjs-config'
import { TokenExpiredError, TokenInvalidError } from './jwt.errors'

interface TokenPayload {
  sub: string
}

@Injectable()
export class JwtService {
  constructor(private config: ConfigService) {}

  async createToken(userId: string): Promise<string> {
    return await jwt.sign({}, this.config.get('auth.secret'), {
      expiresIn: this.config.get('auth').getTokenLifeTime(),
      issuer: this.config.get('app.name'),
      subject: String(userId),
    })
  }

  parseToken(token: string): Promise<TokenPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.config.get('auth.secret'),
        {
          issuer: this.config.get('app.name'),
        },
        (
          error: jwt.JsonWebTokenError | jwt.TokenExpiredError | undefined,
          decoded: TokenPayload,
        ) => {
          if (error) {
            if (error instanceof jwt.TokenExpiredError) {
              reject(new TokenExpiredError())
            } else if (error instanceof jwt.JsonWebTokenError) {
              reject(new TokenInvalidError())
            } else {
              reject(error)
            }
          } else {
            resolve(decoded)
          }
        },
      )
    })
  }
}
