import { FieldProps } from 'informed'
import { Omit } from 'lodash'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface BasicInputProps<V, VS = any>
  extends Omit<FieldProps<V, VS>, 'field'> {
  name: string
}

export interface BasicInputPropsWithOptions<V, VS>
  extends BasicInputProps<V, VS> {
  options: Array<{
    label: string
    value: V
  }>
}
