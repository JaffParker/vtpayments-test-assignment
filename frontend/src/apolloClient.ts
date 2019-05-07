import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import ApolloClient from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client'

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeApolloClient = (bearerToken?: string): ApolloClient<any> => {
  const cache = new InMemoryCache()

  const UploadLink = createUploadLink()

  const ErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ` +
            `${locations}, Path: ${path}`,
        ),
      )
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  })

  const AuthLink = setContext(() => {
    const token = bearerToken

    if (token) return { headers: { Authorization: `Bearer ${token}` } }
  })

  const link = ApolloLink.from([ErrorLink, AuthLink, UploadLink])

  return new ApolloClient({
    cache,
    link,
  })
}
