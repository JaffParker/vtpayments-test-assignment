import gql from 'graphql-tag'

export const getMerchantsByUser = gql`
  query getMerchantsByUser {
    getMerchantsByUser {
      id
      name
    }
  }
`
