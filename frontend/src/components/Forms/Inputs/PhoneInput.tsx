import React from 'react'
import { TextInput } from './TextInput'
import { pipe, phone } from '../../../helpers/validator'
import { normalizePhone } from '../../../helpers/normalizePhone'
import { BasicInputProps } from './BasicInputProps'

export const PhoneInput: React.FC<BasicInputProps<string>> = ({
  validate = () => undefined,
  name,
  initialValue,
  ...props
}) => (
  <TextInput
    type="tel"
    name={name}
    validate={pipe(
      phone(),
      validate,
    )}
    mask={normalizePhone}
    initialValue={initialValue && normalizePhone(initialValue)}
    {...props}
  />
)
