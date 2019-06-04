import { FC, Fragment, useContext } from 'react'
import { Form } from 'informed'
import React from 'react'
import { SelectEditResellerInput } from './SelectEditResellerInput'

export const SelectEditResellers: FC<any> = ({ ...props }) => {
  return (
    <Fragment>
      <Form>
        <SelectEditResellerInput
          onResellerSelected={props.onResellerSelected}
          name="Select a reseller"
        />
      </Form>
    </Fragment>
  )
}
