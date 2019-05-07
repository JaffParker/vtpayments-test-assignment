import React, { SyntheticEvent, FC } from 'react'
import { FieldContext, useField } from 'informed'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { BasicInputProps } from './BasicInputProps'
import 'react-datepicker/dist/react-datepicker.min.css'
import './DateInput.css'
import parse from 'date-fns/parse'
import isValid from 'date-fns/is_valid'
import format from 'date-fns/format'
import { Omit } from 'lodash'

interface DateInputProps
  extends Omit<BasicInputProps<Date>, 'initialValue'>,
    Omit<
      ReactDatePickerProps,
      | 'onChange'
      | 'name'
      | 'onBlur'
      | 'onFocus'
      | 'onKeyDown'
      | 'onSelect'
      | 'value'
    > {
  dateFormat?: string
  today?: boolean
  initialValue?: Date
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const handleManualEntry = (
  setValue: FieldContext<Date>['fieldApi']['setValue'],
  dateFormat: string,
) => (event: SyntheticEvent<HTMLInputElement>) => {
  //@ts-ignore
  const date = parse(event.currentTarget.value, dateFormat)

  if (isValid(date)) {
    setValue(date)
  }
}

export const DateInput: FC<DateInputProps> = ({
  name,
  today = false,
  showTimeSelect,
  dateFormat = `MMM. do, YYYY${showTimeSelect ? ' HH:mm' : ''}`,
  ...props
}) => {
  const {
    fieldState: { value, touched, error },
    fieldApi: { setTouched, setValue },
  } = useField<Date>(name, {
    ...props,
    validateOnBlur: !!props.validate,
    validateOnChange: !!props.validate,
    validateOnMount: !!props.validate,
  })

  return (
    <ReactDatePicker
      onFocus={() => setTouched(true)}
      //@ts-ignore
      onChange={date => setValue(date)}
      onChangeRaw={handleManualEntry(setValue, dateFormat)}
      showTimeSelect={showTimeSelect}
      dateFormat={dateFormat}
      selected={value}
      openToDate={value || undefined}
      todayButton={today ? 'Today' : undefined}
      className={`form-control w-100 ${touched && error ? 'is-invalid' : ''}`}
      {...props}
    />
  )
}

DateInput.defaultProps = {
  today: false,
  yearDropdownItemNumber: 100,
  placeholderText: `Ex.: ${format(new Date(), 'MMM D YYYY')}`,
}
