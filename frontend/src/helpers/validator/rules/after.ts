import isEmpty from 'lodash/isEmpty'
import format from 'date-fns/format'
import isAfter from 'date-fns/is_after'

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const after = (
  date: Date,
  message = `Date must be after ${format(date, 'MMM. Do, YYYY')}`,
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
) => (value: any) =>
  isEmpty(value) || isAfter(new Date(), date) ? undefined : message
