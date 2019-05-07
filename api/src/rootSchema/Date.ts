import { GraphQLScalarType, Kind, GraphQLError } from 'graphql'
import { isValid } from 'date-fns'

const parseDate = (value: string): Date => {
  const date = new Date(value)

  if (!isValid(date))
    throw Error('value must be a valid date in format ISO_8601')

  return date
}

export const GqlDate = new GraphQLScalarType({
  name: 'Date',
  parseValue: parseDate,
  serialize: (value: Date) => value.toJSON(),
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING) return parseDate(ast.value)
    throw new GraphQLError(
      `Expected Date to be a string, but got ${ast.kind}`,
      [ast],
    )
  },
})
