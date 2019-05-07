import gql from 'graphql-tag'

export const RevokePermission = gql`
  mutation RevokePermission($userId: ID!, $permissionId: ID!) {
    revokePermission(userId: $userId, permissionId: $permissionId)
  }
`
