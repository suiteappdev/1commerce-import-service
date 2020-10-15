const {
  GraphQLObjectType,
  GraphQLInt
} = require('graphql');

const VtexPaginationType = new GraphQLObjectType({
name: 'VtexPaginationType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt }
  }),
});

module.exports = VtexPaginationType;