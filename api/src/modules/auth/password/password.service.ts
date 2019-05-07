import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcryptjs'

@Injectable()
export class PasswordService {
  hash(password: string): Promise<string> {
    return hash(password, 10)
  }

  compare(hash: string, input: string): Promise<boolean> {
    return compare(input, hash)
  }
}
