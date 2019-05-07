import React, { FC, Fragment } from 'react'
import { BasicInputProps } from './BasicInputProps'
import { BasicTextArea, useField } from 'informed'
import classNames from 'classnames'
import { FormFeedback } from 'reactstrap'

interface TextAreaProps extends BasicInputProps<string, {}> {}

export const TextArea: FC<TextAreaProps> = ({ name, ...props }) => {
  const {
    fieldApi,
    fieldState,
    fieldState: { error, touched },
  } = useField(name, {
    ...props,
    validateOnBlur: !!props.validate,
    validateOnChange: !!props.validate,
    validateOnMount: !!props.validate,
  })

  return (
    <Fragment>
      <BasicTextArea
        className={classNames([
          'form-control',
          { [`is-invalid`]: error && touched },
        ])}
        fieldApi={fieldApi}
        fieldState={fieldState}
      />

      {error && touched && <FormFeedback>{error}</FormFeedback>}
    </Fragment>
  )
}
