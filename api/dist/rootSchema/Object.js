"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const parse = (value) => {
    try {
        return JSON.parse(value);
    }
    catch (e) {
        throw new Error('value must be a valid JSON object');
    }
};
exports.GqlObject = new graphql_1.GraphQLScalarType({
    name: 'Object',
    parseValue: parse,
    serialize: (value) => JSON.stringify(value),
    parseLiteral: ast => {
        if (ast.kind === graphql_1.Kind.STRING)
            return parse(ast.value);
        throw new graphql_1.GraphQLError(`Expected Date to be a string, but got ${ast.kind}`, [ast]);
    },
});
//# sourceMappingURL=Object.js.map