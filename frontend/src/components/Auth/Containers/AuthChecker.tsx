import React, { ReactNode, FC, useContext } from 'react'
import { Query } from 'react-apollo'
import { GetSignedInUser } from '../../../graphql/queries/GetSignedInUser'
import { User } from '../../../types/Api'
import { AuthContext } from '../../../contexts/AuthContext'

interface AuthCheckerProps {
  children: (params: {
    loading?: boolean
    isSignedIn?: boolean
    user?: User
  }) => ReactNode
}

//@ts-ignore
export const AuthChecker: FC<AuthCheckerProps> = ({ children }) => {
  const context = useContext(AuthContext)

  if (context.isSignedIn)
    return (
      <Query<{ signedInUser: User }> query={GetSignedInUser}>
        {({ data, loading, error }) => {
          if (loading) return children({ loading: true })

          if (error) {
            context.signOut()
            return children({
              loading: false,
              isSignedIn: false,
            })
          }

          return children({
            loading: false,
            isSignedIn: true,
            user: data && data.signedInUser,
          })
        }}
      </Query>
    )
  else {
    return children({ isSignedIn: false, loading: false })
  }
}
