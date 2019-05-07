import { User } from '../../modules/users/users.entity'

export interface GraphqlContext {
  isSignedIn: boolean
  user?: User
}
