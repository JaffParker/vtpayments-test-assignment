import { GraphQLScalarType, Kind, GraphQLError } from 'graphql'

const parse = (value: string): Record<string, string | number> => {
  try {
    return JSON.parse(value)
  } catch (e) {
    throw new Error('value must be a valid JSON object')
  }
}

export const GqlObject = new GraphQLScalarType({
  name: 'Object',
  parseValue: parse,
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize: (value: any) => JSON.stringify(value),
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING) return parse(ast.value)
    throw new GraphQLError(
      `Expected Date to be a string, but got ${ast.kind}`,
      [ast],
    )
  },
})
