import isEmpty from 'lodash/isEmpty'

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const oneOf = (
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  allowedValues: any[],
  message = `Value must be one of ${allowedValues.join(', ')}`,
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
) => (value: any) =>
  isEmpty(value) || allowedValues.includes(value) ? undefined : message
