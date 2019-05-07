import gql from 'graphql-tag'

export const GetPermissionsAndForUser = gql`
  query GetPermissionsAndForUser($userId: ID!) {
    getPermissions {
      id
      code
      name
      description
    }

    getPermissionsForUser(userId: $userId) {
      id
    }
  }
`
