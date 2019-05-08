import gql from 'graphql-tag'

export const GetLoggedInUserMerchants = gql`
  query GetLoggedInUserMerchants {
    getLoggedInUserMerchants {
      id
      name
    }
  }
`
