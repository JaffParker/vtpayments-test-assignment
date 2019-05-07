import React, { FC } from 'react'
import { Form } from 'informed'
import { SubmitButton } from '../../Forms/Inputs/SubmitButton'
import { Row, Col, FormGroup, Label } from 'reactstrap'
import { PasswordInput } from '../../Forms/Inputs/PasswordInput'
import { sameAs, pipe, required } from '../../../helpers/validator'

export interface PasswordFormValues {
  password: string
}
interface PasswordFormProps {
  onSubmit: (values: PasswordFormValues) => void
  submitting: boolean
  submitText?: string
}

export const PasswordForm: FC<PasswordFormProps> = ({
  onSubmit,
  submitting,
  submitText = 'Create',
}) => (
  <Form onSubmit={onSubmit}>
    <Row>
      <Col sm="12" md="6">
        <FormGroup>
          <Label>Password:</Label>
          <PasswordInput
            name="password"
            notify={['passwordConfirmation']}
            validate={required()}
          />
        </FormGroup>
      </Col>
      <Col sm="12" md="6">
        <FormGroup>
          <Label>Same password again:</Label>
          <PasswordInput
            name="passwordConfirmation"
            validate={pipe(
              required(),
              sameAs('password'),
            )}
          />
        </FormGroup>
      </Col>
    </Row>

    <hr />
    <div className="float-right">
      <SubmitButton submitting={submitting}>{submitText}</SubmitButton>
    </div>
  </Form>
)
