import React, { FC, useContext } from 'react'
import { BasicInputPropsWithOptions } from './BasicInputProps'
import { FormValue, useField } from 'informed'
import { ButtonGroup, Button, FormFeedback, InputGroup } from 'reactstrap'
import { DisabledFormContext } from '../../../contexts/DisabledFormContext'
import { TextInput } from './TextInput'

interface StyledRadioGroupProps
  extends BasicInputPropsWithOptions<FormValue, {}> {}

export const StyledRadioGroup: FC<StyledRadioGroupProps> = ({
  name,
  options,
  ...props
}) => {
  const {
    fieldState: { value, error, touched },
    fieldApi: { setValue, setTouched },
  } = useField(name, {
    ...props,
    validateOnBlur: !!props.validate,
    validateOnChange: !!props.validate,
    validateOnMount: !!props.validate,
  })
  const formDisabled = useContext(DisabledFormContext)

  return !formDisabled ? (
    <InputGroup>
      <ButtonGroup>
        {options.map(option => (
          <Button
            onClick={() => setValue(option.value)}
            onBlur={() => setTouched(true)}
            outline
            color="secondary"
            active={option.value === value}
            key={String(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
      {error && touched && <FormFeedback tooltip>{error}</FormFeedback>}
    </InputGroup>
  ) : (
    <TextInput
      name={name}
      initialValue={
        options.find(option => option.value === value)!.label as string
      }
    />
  )
}
