import React, { Fragment, FC, useContext } from 'react'
import { MiniHeader } from '../../Layout/Views/MiniHeader'
import { Mutation } from 'react-apollo'
import { SignIn } from '../../../graphql/mutations/SignIn'
import { SignInForm, SignInFormValues } from '../Forms/SignInForm'
import { SignInInput, Auth } from '../../../types/Api'
import {
  AuthContext,
  GuestAuthContextState,
} from '../../../contexts/AuthContext'

export const SignInContainer: FC = () => {
  const { signIn } = useContext(AuthContext) as GuestAuthContextState

  return (
    <Mutation<{ signIn: Auth }, { input: SignInInput }>
      mutation={SignIn}
      onCompleted={({ signIn: { token, user } }) => {
        signIn(user, token)
      }}
    >
      {(signIn, { loading, error }) => {
        const onSubmit = (values: SignInFormValues): void => {
          signIn({ variables: { input: values } })
        }
        return (
          <Fragment>
            <MiniHeader />
            <h1>Sign In</h1>
            <hr />
            <SignInForm
              submitting={loading}
              onSubmit={onSubmit}
              error={error ? error.graphQLErrors[0].message : undefined}
            />
          </Fragment>
        )
      }}
    </Mutation>
  )
}
