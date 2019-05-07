import React, { FC, ComponentType } from 'react'
import { BasicInputProps } from './Inputs/BasicInputProps'
import { FormGroup as RBSFormGroup, Label } from 'reactstrap'

//eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FormGroupProps extends BasicInputProps<any> {
  label: string
  name: string
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<BasicInputProps<any>>
}

export const FormGroup: FC<FormGroupProps> = ({
  label,
  Component,
  ...props
}) => (
  <RBSFormGroup>
    <Label>{label}</Label>
    <Component {...props} />
  </RBSFormGroup>
)
