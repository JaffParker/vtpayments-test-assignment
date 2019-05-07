import gql from 'graphql-tag'
import { UserFragments } from '../fragments/User'

export const SignIn = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      token
      user {
        id
        ...UserProfile
        ...UserPermissions
      }
    }
  }

  ${UserFragments.profile}
  ${UserFragments.permissions}
`
