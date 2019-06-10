import gql from 'graphql-tag'

export const CreateMerchant = gql`
  mutation CreateMerchant($input: MerchantInput!) {
    createMerchant(input: $input) {
      id
      name
      resellerId
      isReseller
    }
  }
`
