const { GraphQLObjectType } = require('graphql');
const ShopifyProducts = require('./Shopify/shopifyProducts');
const WoocommerceProducts = require('./Woocommerce/woocommerceProducts');
const VtexProducts = require('./Vtex/vtexProducts');
const PrestashopProducts = require('./Prestashop/prestashopProducts');


const Subscription = new GraphQLObjectType({
  name: 'RootSubscription',
  description: 'Root Subscription',
  fields: {
    ShopifyProducts,
    VtexProducts,
    WoocommerceProducts,
    PrestashopProducts
  }
});

module.exports = { Subscription };
