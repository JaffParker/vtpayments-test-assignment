import React, { FC } from 'react'
import { Row, Col } from 'reactstrap'
import { required, pipe } from '../../../helpers/validator'
import { TextInput } from '../Inputs/TextInput'
import toUpper from 'lodash/toUpper'
import { NameInput } from '../Inputs/NameInput'
import { FormGroup } from '../FormGroup'

interface AddressFormFragmentProps {
  initialValues?: Partial<{
    country: string
    state: string
    city: string
    address: string
    zipCode: string
  }>
}

export const AddressFormFragment: FC<AddressFormFragmentProps> = ({
  initialValues = {},
}) => {
  return (
    <div>
      <Row>
        <Col md="8">
          <FormGroup
            label="Address:"
            name="address.address"
            validate={required()}
            placeholder="Ex.: 999-2567 Sunset Boul."
            initialValue={initialValues.address}
            Component={TextInput}
          />
        </Col>
        <Col md="4">
          <FormGroup
            label="Postal code:"
            name="address.zipCode"
            mask={toUpper}
            placeholder="Ex.: A1A 1A1"
            initialValue={initialValues.zipCode}
            validate={pipe(required())}
            Component={TextInput}
          />
        </Col>
      </Row>

      <Row>
        <Col md="6">
          <FormGroup
            label="City:"
            name="address.city"
            initialValue={initialValues.city}
            placeholder="Ex.: Montreal"
            validate={required()}
            Component={NameInput}
          />
        </Col>
        <Col sm="4" md="2">
          <FormGroup
            label="Province/State:"
            name="address.state"
            initialValue={initialValues.state}
            placeholder="Ex.: QC"
            validate={required()}
            Component={TextInput}
          />
        </Col>
        <Col sm="8" md="4">
          <FormGroup
            label="Country:"
            name="address.country"
            validate={required()}
            initialValue={initialValues.country}
            Component={NameInput}
          />
        </Col>
      </Row>
    </div>
  )
}
