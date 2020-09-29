const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql');

const ShopifyProductVariationType = require('./shopifyProductVariation.type');
const ShopifyProductVariationListType = new GraphQLObjectType({
  name: 'ShopifyProductVariationListType',
  fields: () => ({
    data: { type: new GraphQLList(ShopifyProductVariationType) },
  })
});

module.exports = ShopifyProductVariationListType;