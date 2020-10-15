const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} = require('graphql');

const ShopifyProductVType = require('./shopifyProductV.type');
const ShopifyProductVariationListType = new GraphQLObjectType({
  name: 'ShopifyProductVariationListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt },
    pagination : { type: GraphQLString },
    data: { type: new GraphQLList(ShopifyProductVType) },
  }),
});

module.exports = ShopifyProductVariationListType;
