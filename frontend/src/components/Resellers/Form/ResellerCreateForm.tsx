import { FormGroup, Label, Row, Col, Button } from 'reactstrap'
import { Form } from 'informed'
import { required } from '../../../helpers/validator'
import { DisabledFormContext } from '../../../contexts/DisabledFormContext'
import { NameInput } from '../../Forms/Inputs/NameInput'
import { TextInput } from '../../Forms/Inputs/TextInput'
import React, { FC, Fragment, useContext } from 'react'
import { SubmitButton } from '../../Forms/Inputs/SubmitButton'
import { CreateResellerInput } from '../../../../../api/src/types/Api'
import { MerchantErrors } from '../../../types/Errors/MerchantErrors'

interface ResellerFormProps {
  onSubmit: (values: CreateResellerInput) => void
  onCancel?: () => void
  initialValues?: Partial<CreateResellerInput>
  submitting: boolean
  submitText?: string
  error?: MerchantErrors
  data?: any
}
const getErrorMessage = (error: MerchantErrors): string => {
  switch (error) {
    case MerchantErrors.DuplicateReseller:
      return 'A Reseller with that name already exists'
    default:
      return 'Something went wrong during the validation of this form'
  }
}

export const ResellerCreateForm: FC<ResellerFormProps> = ({
  onSubmit,
  onCancel,
  error,
  submitting,
  initialValues,
  submitText = 'Submit',
}) => {
  const formDisabled = useContext(DisabledFormContext)

  return (
    <Form<CreateResellerInput> onSubmit={onSubmit}>
      {() => (
        <Fragment>
          {error && (
            <span className="text-danger">{getErrorMessage(error)}</span>
          )}

          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label>Name</Label>
                <NameInput
                  name="name"
                  validate={required()}
                  initialValue={initialValues && initialValues.name}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label>Phone</Label>
                <TextInput
                  name="phone"
                  validate={required()}
                  initialValue={initialValues && initialValues.phone}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label>Country</Label>
                <TextInput
                  name="country"
                  validate={required()}
                  initialValue={initialValues && initialValues.country}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label>State</Label>
                <TextInput
                  name="state"
                  validate={required()}
                  initialValue={initialValues && initialValues.state}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label>City</Label>
                <TextInput
                  name="city"
                  validate={required()}
                  initialValue={initialValues && initialValues.city}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label>Address</Label>
                <TextInput
                  name="address"
                  validate={required()}
                  initialValue={initialValues && initialValues.address}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label>ZipCode</Label>
                <TextInput
                  name="zipCode"
                  validate={required()}
                  initialValue={initialValues && initialValues.zipCode}
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
