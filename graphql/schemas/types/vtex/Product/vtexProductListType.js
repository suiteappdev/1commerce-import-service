const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const VtexProductType = require('./vtexProduct.type');
const VtexProductListType = new GraphQLObjectType({
name: 'VtexProductListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt },
    data: { type: new GraphQLList(VtexProductType) },
  }),
});

module.exports = VtexProductListType;