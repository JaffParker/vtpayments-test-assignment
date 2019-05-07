import gql from 'graphql-tag'

export const ConfirmEmail = gql`
  mutation ConfirmEmail($token: String!) {
    confirmEmail(token: $token) {
      email
      userId
    }
  }
`
