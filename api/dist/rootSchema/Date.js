"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const date_fns_1 = require("date-fns");
const parseDate = (value) => {
    const date = new Date(value);
    if (!date_fns_1.isValid(date))
        throw Error('value must be a valid date in format ISO_8601');
    return date;
};
exports.GqlDate = new graphql_1.GraphQLScalarType({
    name: 'Date',
    parseValue: parseDate,
    serialize: (value) => value.toJSON(),
    parseLiteral: ast => {
        if (ast.kind === graphql_1.Kind.STRING)
            return parseDate(ast.value);
        throw new graphql_1.GraphQLError(`Expected Date to be a string, but got ${ast.kind}`, [ast]);
    },
});
//# sourceMappingURL=Date.js.map