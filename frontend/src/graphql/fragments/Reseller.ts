import gql from 'graphql-tag'

export const ResellerFragments = {
  details: gql`
    fragment ResellerDetails on Reseller {
      id
      name
      merchants {
        ...MerchantSummary
      }
    }
  `,
  summary: gql`
    fragment ResellerSummary on Reseller {
      id
      name
    }
  `,
}
