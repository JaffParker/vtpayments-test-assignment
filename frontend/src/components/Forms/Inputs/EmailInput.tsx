import React from 'react'
import { TextInput } from './TextInput'
import { pipe, email } from '../../../helpers/validator'
import { BasicInputProps } from './BasicInputProps'

export const EmailInput: React.FC<BasicInputProps<string>> = ({
  validate = () => undefined,
  ...props
}) => (
  <TextInput
    type="email"
    validate={pipe(
      email(),
      validate,
    )}
    {...props}
  />
)
