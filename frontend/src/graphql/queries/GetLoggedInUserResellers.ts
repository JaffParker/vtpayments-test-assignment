import gql from 'graphql-tag'
import { ResellerFragments } from '../fragments/Reseller'

export const GetLoggedInUserResellers = gql`
  query GetLoggedInUserResellers {
    getLoggedInUserResellers {
      ...ResellerSummary
    }
  }

  ${ResellerFragments.summary}
`
