const { GraphQLObjectType } = require('graphql');
const ShopifyProducts = require('./Shopify/shopifyProducts');
const ShopifyOrders = require('./Shopify/shopifyOrders');
const WoocommerceOrders = require('./Woocommerce/woocommerceOrders');
const WoocommerceProducts = require('./Woocommerce/woocommerceProducts');
const VtexProducts = require('./Vtex/vtexProducts');
const VtexOrders = require('./Vtex/vtexOrders');
const PrestashopProducts = require('./Prestashop/prestashopProducts');


const Subscription = new GraphQLObjectType({
  name: 'RootSubscription',
  description: 'Root Subscription',
  fields: {
    ShopifyProducts,
    ShopifyOrders,
    VtexProducts,
    VtexOrders,
    WoocommerceProducts,
    WoocommerceOrders,
    PrestashopProducts
  }
});

module.exports = { Subscription };
