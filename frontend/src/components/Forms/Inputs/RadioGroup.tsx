import React, { FC, Fragment } from 'react'
import { BasicInputPropsWithOptions } from './BasicInputProps'
import { BasicRadioGroup, Radio, FormValue, useField } from 'informed'
import { InputGroup } from 'reactstrap'

interface RadioGroupProps extends BasicInputPropsWithOptions<FormValue, {}> {}

export const RadioGroup: FC<RadioGroupProps> = ({
  name,
  options,
  ...props
}) => {
  const { fieldState, fieldApi } = useField(name, {
    ...props,
    validateOnBlur: !!props.validate,
    validateOnChange: !!props.validate,
    validateOnMount: !!props.validate,
  })

  return (
    <Fragment>
      <BasicRadioGroup fieldState={fieldState} fieldApi={fieldApi} {...props}>
        {options.map(option => (
          <InputGroup key={String(option.value)}>
            <label>
              <Radio value={option.value} /> {option.label}
            </label>
          </InputGroup>
        ))}
      </BasicRadioGroup>
    </Fragment>
  )
}
