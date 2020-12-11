const { GraphQLObjectType } = require('graphql');
const ShopifyProducts = require('./Shopify/shopifyProducts');
const WoocommerceProducts = require('./Woocommerce/woocommerceProducts');

const Subscription = new GraphQLObjectType({
  name: 'RootSubscription',
  description: 'Root Subscription',
  fields: {
    ShopifyProducts,
    WoocommerceProducts
  }
});

module.exports = { Subscription };
