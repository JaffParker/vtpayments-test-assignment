import gql from 'graphql-tag'

export const CreateReseller = gql`
  mutation CreateReseller($input: CreateResellerInput!) {
    createReseller(input: $input) {
      id
    }
  }
`
