const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} = require('graphql');

const shopifyProductImg = require('./shopifyProductImg.type');
const ShopifyProductImageListType = new GraphQLObjectType({
  name: 'ShopifyProductImageListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt },
    pagination : { type: GraphQLString },
    data: { type: new GraphQLList(shopifyProductImg) },
  }),
});

module.exports = ShopifyProductImageListType;
