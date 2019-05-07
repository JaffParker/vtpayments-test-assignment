import isEmpty from 'lodash/isEmpty'

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const email = (message = 'This does not look like an email') => (
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
) =>
  /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/i.test(value) || isEmpty(value)
    ? undefined
    : message
