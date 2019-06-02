import gql from 'graphql-tag'

export const GetResellersByUser = gql`
  query GetResellersByUser($userId: String!, $resellerId: String!) {
    getResellersByUser(userId: $userId, resellerId: $resellerId) {
      name
      phone
      country
      state
      city
      address
      zipCode
    }
  }
`
