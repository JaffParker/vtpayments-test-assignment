import gql from 'graphql-tag'

export const GetAllResellersByUser = gql`
  query GetAllResellersByUser($userId: String!) {
    getAllResellersByUser(userId: $userId) {
      name
      id
    }
  }
`
