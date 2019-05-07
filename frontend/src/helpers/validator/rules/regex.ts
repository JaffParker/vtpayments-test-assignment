import isEmpty from 'lodash/isEmpty'

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const regex = (
  regex: RegExp,
  message = 'Value must match expression',
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
) => (value: any) =>
  isEmpty(value) || regex.test(String(value)) ? undefined : message
