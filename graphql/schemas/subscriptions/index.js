const { GraphQLObjectType } = require('graphql');
const shopifyProducts = require('./Shopify/shopifyProducts');

const Subscription = new GraphQLObjectType({
  name: 'RootSubscription',
  description: 'Root Subscription',
  fields: {
    shopifyProducts: shopifyProducts,
  }
});

module.exports = { Subscription };
