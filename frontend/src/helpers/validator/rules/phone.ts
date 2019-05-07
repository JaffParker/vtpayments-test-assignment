import isEmpty from 'lodash/isEmpty'

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const phone = (message = 'This does not look like a phone number') => (
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
) =>
  /\d{3}-\d{3}-\d{4}( #\d+)?/i.test(value) || isEmpty(value)
    ? undefined
    : message
