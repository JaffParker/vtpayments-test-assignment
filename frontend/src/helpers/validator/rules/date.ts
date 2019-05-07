import isEmpty from 'lodash/isEmpty'
import isValid from 'date-fns/is_valid'
import parse from 'date-fns/parse'

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const date = (message = 'This has to be a date') => (
  value: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) => (isEmpty(value) || isValid(parse(value)) ? undefined : message)
