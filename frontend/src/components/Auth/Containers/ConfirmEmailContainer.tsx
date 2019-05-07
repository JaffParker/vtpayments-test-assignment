import React, { useState } from 'react'
import { ConfirmEmail } from '../../../graphql/mutations/ConfirmEmail'
import { Mutation } from 'react-apollo'
import { EmailConfirmation, SetUserPasswordInput } from '../../../types/Api'
import { Loading } from '../../Misc/Loading'
import { SetUserPassword } from '../../../graphql/mutations/SetUserPassword'
import { PasswordForm, PasswordFormValues } from '../Forms/PasswordForm'
import { MiniHeader } from '../../Layout/Views/MiniHeader'
import { Alert, Container, Col } from 'reactstrap'
import { RunMutation } from '../../Misc/RunMutation'
import { withRouter, RouteComponentProps } from 'react-router'

interface ConfirmEmailContainerProps {
  token: string
}

export const ConfirmEmailContainer = withRouter<
  ConfirmEmailContainerProps & RouteComponentProps
>(({ token, history: { push } }) => {
  const [emailConfirmed, setEmailConfirmed] = useState(false)
  const [userId, setUserId] = useState('')

  return (
    <Mutation<{ setUserPassword: void }, { input: SetUserPasswordInput }>
      mutation={SetUserPassword}
    >
      {(setPassword, { loading: settingPassword }) => (
        <Mutation<{ confirmEmail: EmailConfirmation }, { token: string }>
          mutation={ConfirmEmail}
          variables={{ token }}
        >
          {(confirmEmail, { loading: confirmingEmail, error }) => {
            const handlePasswordSet = async ({
              password,
            }: PasswordFormValues): Promise<void> => {
              await setPassword({
                variables: { input: { id: userId, password } },
              })
              push('/')
            }

            return (
              <RunMutation
                mutateFn={confirmEmail}
                shouldRun={!emailConfirmed}
                onSuccess={result => {
                  setUserId(result.data!.confirmEmail.userId)
                }}
                onComplete={() => {
                  setEmailConfirmed(true)
                }}
              >
                <Container className="mt-5">
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <MiniHeader />
                    <h1 className="mt-5">Finish Sign Up</h1>
                    <hr />
                    {error && (
                      <Alert color="danger">Cannot confirm your email</Alert>
                    )}
                    {confirmingEmail && <Loading />}
                    {emailConfirmed && userId && (
                      <PasswordForm
                        onSubmit={handlePasswordSet}
                        submitting={settingPassword}
                        submitText="Create"
                      />
                    )}
                  </Col>
                </Container>
              </RunMutation>
            )
          }}
        </Mutation>
      )}
    </Mutation>
  )
})
