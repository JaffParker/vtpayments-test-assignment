import isEmpty from 'lodash/isEmpty'
import isBoolean from 'lodash/isBoolean'

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const required = (message = 'Value cannot be empty') => (
  value: any, //eslint-disable-line @typescript-eslint/no-explicit-any
) => (!isBoolean(value) && isEmpty(value) ? message : undefined)
