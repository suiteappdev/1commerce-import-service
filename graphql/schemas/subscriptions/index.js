const { GraphQLObjectType } = require('graphql');
const ShopifyProducts = require('./Shopify/shopifyProducts');
const VtexProducts = require('./Vtex/vtexProducts');


const Subscription = new GraphQLObjectType({
  name: 'RootSubscription',
  description: 'Root Subscription',
  fields: {
    ShopifyProducts: ShopifyProducts,
    VtexProducts: VtexProducts
  }
});

module.exports = { Subscription };
