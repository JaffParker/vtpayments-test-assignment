import gql from 'graphql-tag'

export const CreateMerchant = gql`
  mutation CreateMerchant($input: CreateMerchantInput!) {
    createMerchant(input: $input) {
      id
    }
  }
`
