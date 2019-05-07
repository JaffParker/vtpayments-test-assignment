import gql from 'graphql-tag'

export const SetUserPassword = gql`
  mutation SetUserPassword($input: SetUserPasswordInput!) {
    setUserPassword(input: $input)
  }
`
