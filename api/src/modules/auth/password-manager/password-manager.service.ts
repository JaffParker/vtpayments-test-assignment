import { Injectable } from '@nestjs/common'
import { UsersService } from '../../../modules/users/users.service'
import { PasswordService } from '../password/password.service'

@Injectable()
export class PasswordManagerService {
  constructor(private users: UsersService, private password: PasswordService) {}

  async setPasswordForUser(userId: string, password: string): Promise<void> {
    await this.users.update(userId, {
      password: await this.password.hash(password),
    })
  }
}
