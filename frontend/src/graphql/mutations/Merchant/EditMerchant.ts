import gql from 'graphql-tag'

export const EditMerchant = gql`
  mutation EditMerchant($input: EditMerchantInput!) {
    editMerchant(input: $input) {
      id
    }
  }
`
