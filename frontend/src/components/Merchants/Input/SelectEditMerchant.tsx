import { FC, Fragment, useContext } from 'react'
import { Form } from 'informed'
import React from 'react'
import { SelectMerchantInput } from './SelectMerchantInput'

export const SelectEditMerchant: FC<any> = ({ ...props }) => {
  return (
    <Fragment>
      <Form>
        <SelectMerchantInput
          onMerchantSelected={props.onMerchantSelected}
          name="Select a merchant"
        />
      </Form>
    </Fragment>
  )
}
