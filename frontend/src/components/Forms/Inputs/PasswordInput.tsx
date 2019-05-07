import React from 'react'
import { TextInput } from './TextInput'
import { BasicInputProps } from './BasicInputProps'

export const PasswordInput: React.FC<BasicInputProps<string>> = props => (
  <TextInput type="password" {...props} />
)
