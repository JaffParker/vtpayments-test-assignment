import React, { FC, Fragment } from 'react'
import { FormGroup, Label } from 'reactstrap'
import { EmailInput } from '../../Forms/Inputs/EmailInput'
import { required } from '../../../helpers/validator'
import { SubmitButton } from '../../Forms/Inputs/SubmitButton'
import { PasswordInput } from '../../Forms/Inputs/PasswordInput'
import { SignInErrors } from '../../../types/Errors/SignInErrors'
import { Form } from 'informed'

export interface SignInFormValues {
  email: string
  password: string
}
interface SignInFormProps {
  onSubmit: (values: SignInFormValues) => void
  submitting: boolean
  error?: SignInErrors
}

const getErrorMessage = (error: SignInErrors): string => {
  switch (error) {
    case SignInErrors.PasswordInvalid:
      return 'The password you gave does not match the one we have'

    case SignInErrors.UserNotFound:
      return 'Cannot find this email in the database'

    default:
      return 'Something went wrong.'
  }
}

export const SignInForm: FC<SignInFormProps> = ({
  onSubmit,
  submitting,
  error,
}) => (
  <Form onSubmit={onSubmit}>
    {() => (
      <Fragment>
        {error && <span className="text-danger">{getErrorMessage(error)}</span>}
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <EmailInput name="email" validate={required()} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <PasswordInput name="password" validate={required()} />
        </FormGroup>
        <div className="clearfix">
          <SubmitButton submitting={submitting} className="float-right">
            Sign In
          </SubmitButton>
        </div>
      </Fragment>
    )}
  </Form>
)
