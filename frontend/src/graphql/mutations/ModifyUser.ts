import gql from 'graphql-tag'
import { UserFragments } from '../fragments/User'

export const ModifyUser = gql`
  mutation ModifyUser($id: ID!, $input: UserInput!) {
    modifyUser(id: $id, input: $input) {
      id
      ...UserProfile
    }
  }

  ${UserFragments.profile}
`
