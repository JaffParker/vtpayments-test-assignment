import gql from 'graphql-tag'

export const GetResellerById = gql`
  query GetResellerById($id: ID!) {
    getResellerById(id: $id) {
      id
      name
      merchants {
        name
      }
      user {
        email
      }
    }
  }
`
