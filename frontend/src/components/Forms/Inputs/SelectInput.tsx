import React, { FC, Fragment } from 'react'
import { BasicSelect, Option, FormValue, useField } from 'informed'
import { BasicInputPropsWithOptions } from './BasicInputProps'
import classNames from 'classnames'
import { FormFeedback } from 'reactstrap'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SelectInputProps extends BasicInputPropsWithOptions<FormValue, any> {}

export const SelectInput: FC<SelectInputProps> = ({
  name,
  placeholder,
  options,
  ...props
}) => {
  const {
    fieldState,
    fieldApi,
    fieldState: { touched, error },
  } = useField(name, {
    ...props,
    validateOnBlur: !!props.validate,
    validateOnChange: !!props.validate,
    validateOnMount: !!props.validate,
  })

  return (
    <Fragment>
      <BasicSelect
        {...props}
        field={name}
        fieldState={fieldState}
        fieldApi={fieldApi}
        className={classNames('form-control', {
          'is-invalid': touched && error,
        })}
      >
        <Option value="" disabled>
          {placeholder}
        </Option>
        {options.map(({ value, label }) => (
          //@ts-ignore
          <Option key={String(value)} value={value}>
            {label}
          </Option>
        ))}
      </BasicSelect>

      {error && touched && <FormFeedback>{error}</FormFeedback>}
    </Fragment>
  )
}
