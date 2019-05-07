import React, { FC, useCallback } from 'react'
import { BasicInputPropsWithOptions } from './BasicInputProps'
import { useField } from 'informed'
import { ValueType } from 'react-select/lib/types'
import Select from 'react-select/lib/Select'

interface SearchableSelectProps
  extends BasicInputPropsWithOptions<string, any> {} //eslint-disable-line @typescript-eslint/no-explicit-any

export const SearchableSelect: FC<SearchableSelectProps> = ({
  name,
  options,
  ...props
}) => {
  const {
    fieldState: { value, touched },
    fieldApi: { setTouched, setValue },
  } = useField(name, props)

  const handleChange = useCallback(
    (value: ValueType<{ label: string; value: string }>) => {
      if (value && !Array.isArray(value)) setValue(value.value)
    },
    [setValue],
  )

  const handleBlur = useCallback(() => {
    if (!touched) setTouched(true)
  }, [setTouched, touched])

  return (
    <Select
      onChange={handleChange}
      onInputChange={console.log}
      options={options}
      onBlur={handleBlur}
      onMenuOpen={() => {}}
      value={options.find(option => option.value === value)}
    />
  )
}
