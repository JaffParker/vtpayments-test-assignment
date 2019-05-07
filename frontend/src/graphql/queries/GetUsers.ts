import gql from 'graphql-tag'
import { UserFragments } from '../fragments/User'

export const GetUsers = gql`
  query GetUsers($merchantId: ID) {
    users(merchantId: $merchantId) {
      id
      emailConfirmed
      ...UserProfile
    }
  }

  ${UserFragments.profile}
`
