import React, {
  Fragment,
  SyntheticEvent,
  FC,
  useCallback,
  useContext,
} from 'react'
import { BasicInputProps } from './BasicInputProps'
import { FormFeedback, InputGroup } from 'reactstrap'
import classNames from 'classnames'
import { useField } from 'informed'
import { DisabledFormContext } from '../../../contexts/DisabledFormContext'
import styles from './TextInput.module.css'

export const FileInput: FC<BasicInputProps<File>> = ({ name, ...props }) => {
  const {
    fieldApi: { setValue },
    fieldState: { value, touched, error },
  } = useField(name, props)
  const formDisabled = useContext(DisabledFormContext)

  const handleChange = useCallback(
    (event: SyntheticEvent) => {
      //@ts-ignore
      const file: File = event.target.files[0]
      setValue(file)
    },
    [setValue],
  )

  return (
    <Fragment>
      <InputGroup>
        <input
          type="file"
          className={classNames('custom-file-input', {
            'is-invalid': touched && error,
          })}
          disabled={formDisabled}
          id="inputGroupFile"
          aria-describedby="inputGroupFileAddon"
          onChange={handleChange}
        />
        <label
          className={`custom-file-label ${formDisabled ? styles.Disabled : ''}`}
          htmlFor="inputGroupFile"
        >
          {(value && value.name) || formDisabled ? 'Empty' : 'Choose file...'}
        </label>
      </InputGroup>
      {error && touched && <FormFeedback tooltip>{error}</FormFeedback>}
    </Fragment>
  )
}
