import gql from 'graphql-tag'

export const EditReseller = gql`
  mutation EditReseller($input: EditResellerInput!) {
    editReseller(input: $input) {
      id
    }
  }
`
