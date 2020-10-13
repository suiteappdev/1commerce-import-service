const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const shopifyProductImg = require('./shopifyProductImg.type');
const ShopifyProductImageListType = new GraphQLObjectType({
  name: 'ShopifyProductImageListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt },
    data: { type: new GraphQLList(shopifyProductImg) },
  }),
});

module.exports = ShopifyProductImageListType;
