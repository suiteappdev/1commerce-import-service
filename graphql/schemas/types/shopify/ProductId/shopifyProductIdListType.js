const {
    GraphQLObjectType,
    GraphQLList
} = require('graphql');

const ShopifyProductIdType = require('./shopifyProductId.type');
const ShopifyProductIdListType = new GraphQLObjectType({
  name: 'ShopifyProductIdListType',
  fields: () => ({
    data: { type: new GraphQLList(ShopifyProductIdType) },
  }),
});

module.exports = ShopifyProductIdListType;
  