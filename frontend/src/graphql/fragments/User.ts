import gql from 'graphql-tag'

export const UserFragments = {
  profile: gql`
    fragment UserProfile on User {
      email
      active
      profile {
        firstName
        lastName
      }
    }
  `,
  permissions: gql`
    fragment UserPermissions on User {
      permissions {
        id
        code
        name
        description
      }
    }
  `,
}
