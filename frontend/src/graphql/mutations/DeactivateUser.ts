import gql from 'graphql-tag'

export const DeactivateUser = gql`
  mutation DeactivateUser($userId: ID!) {
    deactivateUser(id: $userId) {
      id
      active
    }
  }
`
