const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const ShopifyProductType = require('./shopifyProduct.type');
const ShopifyProductListType = new GraphQLObjectType({
  name: 'ShopifyProductListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagination : { type: GraphQLString },
    pagesCount: { type: GraphQLInt },
    data: { type: new GraphQLList(ShopifyProductType) },
  }),
});

module.exports = ShopifyProductListType;
  