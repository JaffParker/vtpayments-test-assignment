import isEmpty from 'lodash/isEmpty'

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const sameAs = (
  fieldName: string,
  message = `Value must be the same as ${fieldName}`,
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
) => (value: any, values: { [key: string]: any }) =>
  isEmpty(value) ||
  (values.hasOwnProperty(fieldName) && values[fieldName] === value)
    ? undefined
    : message
