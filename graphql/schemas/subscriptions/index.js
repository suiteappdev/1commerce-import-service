const { GraphQLObjectType } = require('graphql');
const shopifyProductCreated = require('./Shopify/shopifyProductCreated');

const Subscription = new GraphQLObjectType({
  name: 'RootSubscription',
  description: 'Root Subscription',
  fields: {
    ShopifyProductCreated: shopifyProductCreated,
  }
});

module.exports = { Subscription };
