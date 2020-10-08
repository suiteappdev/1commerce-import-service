const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const PrestashopProductType = require('./prestashopProduct.type');
const PrestashopProductListType = new GraphQLObjectType({
  name: 'PrestashopProductListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagination : { type: GraphQLString },
    pagesCount: { type: GraphQLInt },
    data: { type: new GraphQLList(PrestashopProductType) },
  }),
});

module.exports = PrestashopProductListType;