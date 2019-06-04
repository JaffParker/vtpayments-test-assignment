import gql from 'graphql-tag'

export const GetMerchantsByUser = gql`
  query GetMerchantsByUser($userId: String!, $merchantId: String!) {
    getMerchantsByUser(userId: $userId, merchantId: $merchantId) {
      resellerId
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
