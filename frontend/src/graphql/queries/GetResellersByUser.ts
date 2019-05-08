import gql from 'graphql-tag'

export const GetResellersByUser = gql`
  query GetResellersByUser($userId: ID!) {
    getResellersByUser(userId: $userId) {
      id
      name
    }
  }
`
