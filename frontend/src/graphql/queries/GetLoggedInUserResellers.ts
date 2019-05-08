import gql from 'graphql-tag'

export const GetLoggedInUserResellers = gql`
  query GetLoggedInUserResellers {
    getLoggedInUserResellers {
      id
      name
    }
  }
`
