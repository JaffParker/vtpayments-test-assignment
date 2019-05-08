import gql from 'graphql-tag'

export const MerchantFragments = {
  summary: gql`
    fragment MerchantSummary on Merchant {
      id
      name
    }
  `,
}
