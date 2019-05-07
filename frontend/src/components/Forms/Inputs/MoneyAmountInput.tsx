import React, { FC, Fragment } from 'react'
import { BasicInputProps } from './BasicInputProps'
import { useField, BasicText } from 'informed'
import { omitBy } from 'lodash'
import { FormFeedback, InputGroup, InputGroupAddon } from 'reactstrap'
import classNames from 'classnames'

interface MoneyAmountInputProps extends BasicInputProps<string> {}

export const MoneyAmountInput: FC<MoneyAmountInputProps> = ({
  name,
  ...props
}) => {
  const {
    fieldApi,
    fieldState,
    fieldState: { touched, error },
  } = useField(name, {
    ...props,
    validateOnBlur: !!props.validate,
    validateOnChange: !!props.validate,
    validateOnMount: !!props.validate,
  })

  const inputProps = omitBy(
    props,
    value => !['string', 'number'].includes(typeof value),
  )

  return (
    <Fragment>
      <InputGroup
        className={classNames({
          'is-invalid': touched && error,
        })}
      >
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
        <BasicText
          fieldState={fieldState}
          fieldApi={fieldApi}
          className="form-control"
          {...inputProps}
        />
      </InputGroup>
      {error && touched && <FormFeedback tooltip>{error}</FormFeedback>}
    </Fragment>
  )
}
