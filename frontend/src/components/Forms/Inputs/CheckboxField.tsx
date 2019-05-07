import React, { useContext } from 'react'
import classNames from 'classnames'
import { Icon } from '../../Misc/Icon'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { BasicInputProps } from './BasicInputProps'
import styles from './CheckboxField.module.css'
import { useField } from 'informed'
import { DisabledFormContext } from '../../../contexts/DisabledFormContext'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CheckboxFieldProps extends BasicInputProps<any, any> {}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  ...props
}) => {
  const {
    fieldState: { value },
    fieldApi: { setTouched, setValue },
  } = useField<boolean>(name, props)
  const disabled = useContext(DisabledFormContext)

  return (
    <div
      className={classNames(styles.Checkbox, { [styles.checked]: value })}
      onClick={() => {
        if (!disabled) {
          setTouched(true)
          setValue(!value)
        }
      }}
    >
      {value && <Icon icon={faCheck} size="lg" />}
    </div>
  )
}
