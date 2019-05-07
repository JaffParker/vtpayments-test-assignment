import gql from 'graphql-tag'
import { UserFragments } from '../fragments/User'

export const CreateUser = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      ...UserProfile
    }
  }

  ${UserFragments.profile}
`
