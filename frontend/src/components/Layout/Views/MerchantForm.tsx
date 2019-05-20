import React, { FC, useContext } from 'react'
import { Row, Col, FormGroup, Label } from 'reactstrap'
import { Form } from 'informed'

import {
  AuthContext,
  UserAuthContextState,
} from '../../../contexts/AuthContext'
import { SubmitButton } from '../../Forms/Inputs/SubmitButton'
import { CheckboxField } from './../../Forms/Inputs/CheckboxField'
import { TextInput } from './../../Forms/Inputs/TextInput'

export interface MerchantFormValues {
  name: string
  resellerId: string
  isReseller: boolean
  phone: string
  country: string
  state: string
  city: string
  address: string
  zipCode: string
}

interface MerchantFormProps {
  onSubmit: (values: MerchantFormValues) => void
  submitting: boolean
}

export const MerchantForm: FC<MerchantFormProps> = ({
  submitting,
  onSubmit,
}) => {
  const { user } = useContext(AuthContext) as UserAuthContextState
  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col sm="12" md="6">
          <FormGroup>
            <Label>Name:</Label>
            <TextInput name="name" />
          </FormGroup>
          <FormGroup>
            <Label>Phone:</Label>
            <TextInput name="phone" />
          </FormGroup>
          <FormGroup>
            <Label>Country:</Label>
            <TextInput name="country" />
          </FormGroup>
          <FormGroup>
            <Label>State:</Label>
            <TextInput name="state" />
          </FormGroup>
          <FormGroup>
            <Label>City:</Label>
            <TextInput name="city" />
          </FormGroup>
          <FormGroup>
            <Label>Address:</Label>
            <TextInput name="address" />
          </FormGroup>
          <FormGroup>
            <Label>ZipCode:</Label>
            <TextInput name="zipCode" />
          </FormGroup>
          <FormGroup>
            <Label>Is Reseller ?:</Label>
            <CheckboxField name="isReseller" />
          </FormGroup>
        </Col>
      </Row>
      <div className="float-right">
        <SubmitButton submitting={submitting}>Submit</SubmitButton>
      </div>
    </Form>
  )
}
