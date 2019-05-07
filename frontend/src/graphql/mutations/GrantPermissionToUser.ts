import gql from 'graphql-tag'

export const GrantPermissionToUser = gql`
  mutation GrantPermissionToUser($userId: ID!, $permissionId: ID!) {
    grantPermissionToUser(userId: $userId, permissionId: $permissionId)
  }
`
