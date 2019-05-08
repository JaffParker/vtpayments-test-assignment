import gql from 'graphql-tag'
import { ResellerFragments } from '../fragments/Reseller'
import { MerchantFragments } from '../fragments/Merchant'

export const GetResellerById = gql`
  query GetResellerById($id: ID!) {
    getResellerById(id: $id) {
      ...ResellerDetails
    }
  }

  ${ResellerFragments.details}
  ${MerchantFragments.summary}
`
