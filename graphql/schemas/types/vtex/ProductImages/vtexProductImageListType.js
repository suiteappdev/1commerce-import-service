const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const vtexProductI = require('./vtexProductI.type');
const VtexProductImageListType = new GraphQLObjectType({
  name: 'VtexProductImageListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt },
    data: { type: new GraphQLList(vtexProductI) },
  }),
});

module.exports = VtexProductImageListType;