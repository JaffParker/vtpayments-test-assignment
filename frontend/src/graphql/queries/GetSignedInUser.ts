import gql from 'graphql-tag'
import { UserFragments } from '../fragments/User'

export const GetSignedInUser = gql`
  query GetSignedInUser {
    signedInUser {
      id
      ...UserProfile
      ...UserPermissions
    }
  }

  ${UserFragments.profile}
  ${UserFragments.permissions}
`
