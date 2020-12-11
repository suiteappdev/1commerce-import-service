const { GraphQLObjectType } = require('graphql');
const shopifyProductCreated = require('./Shopify/shopifyProductCreated');
const woocommerceProductCreated = require('./Woocommerce/woocommerceProductCreated');

const Subscription = new GraphQLObjectType({
  name: 'RootSubscription',
  description: 'Root Subscription',
  fields: {
    ShopifyProductCreated: shopifyProductCreated,
    WoocommerceProductCreated: woocommerceProductCreated,
  }
});

module.exports = { Subscription };
