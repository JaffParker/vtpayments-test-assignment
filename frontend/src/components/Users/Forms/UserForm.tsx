import React, { FC, Fragment, useContext } from 'react'
import { SubmitButton } from '../../Forms/Inputs/SubmitButton'
import { FormGroup, Label, Row, Col, Button } from 'reactstrap'
import { NameInput } from '../../Forms/Inputs/NameInput'
import { required } from '../../../helpers/validator'
import { EmailInput } from '../../Forms/Inputs/EmailInput'
import { SignUpErrors } from '../../../types/Errors/SignUpErrors'
import { Form } from 'informed'
import { DisabledFormContext } from '../../../contexts/DisabledFormContext'

export interface UserFormValues {
  email: string
  firstName: string
  lastName: string
}

interface UserFormProps {
  onSubmit: (values: UserFormValues) => void
  onCancel?: () => void
  initialValues: Partial<UserFormValues> & { merchantId: string }
  submitting: boolean
  submitText?: string
  error?: SignUpErrors
}

const getErrorMessage = (error: SignUpErrors): string => {
  switch (error) {
    case SignUpErrors.DuplicateUser:
      return 'A user with that email already exists'

    default:
      return 'Something went wrong during the validation of this form'
  }
}

export const UserForm: FC<UserFormProps> = ({
  onSubmit,
  onCancel,
  error,
  submitting,
  initialValues,
  submitText = 'Submit',
}) => {
  const formDisabled = useContext(DisabledFormContext)

  return (
    <Form<UserFormValues> onSubmit={onSubmit}>
      {() => (
        <Fragment>
          {error && (
            <span className="text-danger">{getErrorMessage(error)}</span>
          )}

          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label>First Name</Label>
                <NameInput
                  name="firstName"
                  validate={required()}
                  initialValue={initialValues && initialValues.firstName}
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="6">
              <FormGroup>
                <Label>Last Name</Label>
                <NameInput
                  name="lastName"
                  validate={required()}
                  initialValue={initialValues && initialValues.lastName}
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="6">
              <FormGroup>
                <Label>Email</Label>
                <EmailInput
                  name="email"
                  validate={required()}
                  initialValue={initialValues && initialValues.email}
                />
              </FormGroup>
            </Col>
          </Row>

          {!formDisabled && (
            <Fragment>
              <hr />
              <div className="clearfix">
                <SubmitButton submitting={submitting} className="float-right">
                  {submitText}
                </SubmitButton>
                {onCancel && (
                  <Button
                    color="link"
                    className="text-danger float-right"
                    onClick={onCancel}
                    type="button"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Form>
  )
}
