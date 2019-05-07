import React, { FC, Fragment, useContext } from 'react'
import { BasicText, useField } from 'informed'
import classNames from 'classnames'
import { FormFeedback } from 'reactstrap'
import { BasicInputProps } from './BasicInputProps'
import omitBy from 'lodash/omitBy'
import { DisabledFormContext } from '../../../contexts/DisabledFormContext'
import styles from './TextInput.module.css'

export const TextInput: FC<BasicInputProps<string>> = ({ name, ...props }) => {
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
  const formDisabled = useContext(DisabledFormContext)

  const inputProps = omitBy(
    props,
    value => !['string', 'number'].includes(typeof value),
  )

  return (
    <Fragment>
      <BasicText
        disabled={formDisabled}
        fieldState={fieldState}
        fieldApi={fieldApi}
        {...inputProps}
        className={classNames('form-control', {
          'is-invalid': touched && error,
          [styles.Disabled]: formDisabled,
        })}
      />
      {error && touched && <FormFeedback tooltip>{error}</FormFeedback>}
    </Fragment>
  )
}
