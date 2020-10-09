const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const ShopifyProductVType = require('./shopifyProductV.type');
const ShopifyProductVariationListType = new GraphQLObjectType({
  name: 'ShopifyProductVariationListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt },
    data: { type: new GraphQLList(ShopifyProductVType) },
  }),
});

module.exports = ShopifyProductVariationListType;
