import React, { FC, Fragment } from 'react'
import { FormGroup, Label } from 'reactstrap'
import { required } from '../../../helpers/validator'
import { SubmitButton } from '../../Forms/Inputs/SubmitButton'
import { Form } from 'informed'
import { NameInput } from '../../Forms/Inputs/NameInput'
import { MerchantErrors } from '../../../types/Errors/MerchantErrors'
import { EmailInput } from '../../Forms/Inputs/EmailInput'

export interface MerchantFormValues {
  name: string
  merchantEmail: string
  resellerId: string
}

interface MerchantFormProps {
  onSubmit: (values: MerchantFormValues) => void
  submitting: boolean
  error?: MerchantErrors
}

const getErrorMessage = (error: MerchantErrors): string => {
  switch (error) {
    case MerchantErrors.DuplicateMerchant:
      return 'This merchant name is not available'
    case MerchantErrors.UserNotFound:
      return 'No user was found with the email your provided'
    default:
      return 'Something went wrong.'
  }
}

export const MerchantForm: FC<MerchantFormProps> = ({
  onSubmit,
  submitting,
  error,
}) => (
  <Form onSubmit={onSubmit}>
    {() => (
      <Fragment>
        {error && <span className="text-danger">{getErrorMessage(error)}</span>}
        <FormGroup>
          <Label htmlFor="name">Merchant Name:</Label>
          <NameInput name="name" validate={required()} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="merchantEmail">Merchant Owner email:</Label>
          <EmailInput name="merchantEmail" validate={required()} />
        </FormGroup>
        <div className="clearfix">
          <SubmitButton submitting={submitting} className="float-right">
            Create
          </SubmitButton>
        </div>
      </Fragment>
    )}
  </Form>
)
