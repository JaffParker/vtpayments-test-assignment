import gql from 'graphql-tag'

export const ReactivateUser = gql`
  mutation ReactivateUser($userId: ID!) {
    reactivateUser(id: $userId) {
      id
      active
    }
  }
`
