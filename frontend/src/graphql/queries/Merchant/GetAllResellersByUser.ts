import gql from 'graphql-tag'

export const GetAllMerchantsByUser = gql`
  query GetAllMerchantsByUser($userId: String!) {
    getAllMerchantsByUser(userId: $userId) {
      name
      id
    }
  }
`
