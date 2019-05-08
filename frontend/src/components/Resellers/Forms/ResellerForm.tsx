import React, { FC, Fragment } from 'react'
import { FormGroup, Label } from 'reactstrap'
import { required } from '../../../helpers/validator'
import { SubmitButton } from '../../Forms/Inputs/SubmitButton'
import { ResellerErrors } from '../../../types/Errors/ResellerErrors'
import { Form } from 'informed'
import { NameInput } from '../../Forms/Inputs/NameInput'

export interface ResellerFormValues {
  name: string
}
interface ResellerFormProps {
  onSubmit: (values: ResellerFormValues) => void
  submitting: boolean
  error?: ResellerErrors
}

const getErrorMessage = (error: ResellerErrors): string => {
  switch (error) {
    case ResellerErrors.DuplicateReseller:
      return 'This reseller name is not available'

    default:
      return 'Something went wrong.'
  }
}

export const ResellerForm: FC<ResellerFormProps> = ({
  onSubmit,
  submitting,
  error,
}) => (
  <Form onSubmit={onSubmit}>
    {() => (
      <Fragment>
        {error && <span className="text-danger">{getErrorMessage(error)}</span>}
        <FormGroup>
          <Label htmlFor="name">Reseller Name:</Label>
          <NameInput name="name" validate={required()} />
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
