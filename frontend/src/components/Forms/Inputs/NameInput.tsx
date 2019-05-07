import React from 'react'
import { TextInput } from './TextInput'
import capitalize from 'lodash/capitalize'
import { BasicInputProps } from './BasicInputProps'

const capitalizeWords = (value: string = ''): string =>
  value
    .split(' ')
    .map(capitalize)
    .join(' ')

export const NameInput: React.FC<BasicInputProps<string>> = props => (
  <TextInput mask={capitalizeWords} {...props} />
)
