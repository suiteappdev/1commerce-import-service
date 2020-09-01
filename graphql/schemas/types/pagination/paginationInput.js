const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType
} = require('graphql');

const PaginationInput = new GraphQLInputObjectType({
    name: 'PaginationInput',
    fields: () => ({
      page: { type: GraphQLInt },
      next : { type: GraphQLString },
      pageSize: { type: GraphQLInt },
    }),
  });

  module.exports = PaginationInput;