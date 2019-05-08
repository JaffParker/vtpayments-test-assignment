import gql from 'graphql-tag'

export const CreateReseller = gql`
  mutation CreateReseller($input: ResellerInput!) {
    createReseller(input: $input) {
      id
      name
    }
  }
`
