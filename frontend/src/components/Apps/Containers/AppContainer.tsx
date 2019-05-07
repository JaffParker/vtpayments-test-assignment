import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { makeApolloClient } from '../../../apolloClient'
import { AuthChecker } from '../../Auth/Containers/AuthChecker'
import { Loading } from '../../Misc/Loading'
import { App } from '../App'
import { GuestRouter } from '../../Routers/GuestRouter'
import { AuthContextContainer } from '../../Auth/Containers/AuthContextContainer'
import { AuthContext } from '../../../contexts/AuthContext'

export const AppContainer: FC = () => (
  <AuthContextContainer>
    <AuthContext.Consumer>
      {context => (
        <ApolloProvider
          client={makeApolloClient((context.isSignedIn && context.token) || '')}
        >
          <BrowserRouter>
            <AuthChecker>
              {({ isSignedIn, loading }) =>
                loading ? (
                  <div style={{ height: '100vh' }}>
                    <Loading />
                  </div>
                ) : !isSignedIn ? (
                  <div style={{ height: '100vh' }}>
                    <GuestRouter />
                  </div>
                ) : (
                  <App />
                )
              }
            </AuthChecker>
          </BrowserRouter>
        </ApolloProvider>
      )}
    </AuthContext.Consumer>
  </AuthContextContainer>
)
