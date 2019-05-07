import gql from 'graphql-tag'

export const ResendEmail = gql`
  mutation ResendEmail($userId: ID!) {
    resendConfirmationEmail(userId: $userId)
  }
`
