const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql');

const ShopifyProductImageType = require('./shopifyImage.type');
const ShopifyProductImageListType = new GraphQLObjectType({
  name: 'ShopifyProductImageListType',
  fields: () => ({
    data: { type: new GraphQLList(ShopifyProductImageType) },
  })
});

module.exports = ShopifyProductImageListType;