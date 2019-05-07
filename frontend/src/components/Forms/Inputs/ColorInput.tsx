import React, { FC, Fragment, useContext } from 'react'
import { BasicInputProps } from './BasicInputProps'
import { useField, BasicText } from 'informed'
import { FormFeedback } from 'reactstrap'
import styles from './TextInput.module.css'
import { DisabledFormContext } from '../../../contexts/DisabledFormContext'

export const ColorInput: FC<BasicInputProps<string>> = ({ name, ...props }) => {
  const {
    fieldApi,
    fieldState,
    fieldState: { value, error, touched },
  } = useField(name, props)
  const formDisabled = useContext(DisabledFormContext)

  return (
    <Fragment>
      <BasicText
        fieldApi={fieldApi}
        fieldState={fieldState}
        className={`form-control ${error ? 'is-invalid' : ''} ${
          formDisabled ? styles.Disabled : ''
        }`}
        disabled={formDisabled}
        style={{
          borderBottomWidth: '3px',
          borderBottomStyle: 'solid',
          borderBottomColor: value,
        }}
      />
      {error && touched && <FormFeedback>{error}</FormFeedback>}
    </Fragment>
  )
}
