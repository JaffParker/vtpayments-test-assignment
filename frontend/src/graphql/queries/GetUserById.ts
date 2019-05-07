import gql from 'graphql-tag'
import { UserFragments } from '../fragments/User'

export const GetUserById = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      emailConfirmed
      ...UserProfile
    }
  }

  ${UserFragments.profile}
`
