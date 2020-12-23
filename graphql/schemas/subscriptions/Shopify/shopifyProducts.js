const { pubsub }  = require('../../../../services/pubsub.service') ;
const { SHOPIFY_PRODUCTS }  = require('../events');

const { ShopifyProductsTyPe } = require('../../types/subscription/shopifyProductsType');

module.exports = {
  type: ShopifyProductsTyPe,
  subscribe: () => pubsub.asyncIterator(SHOPIFY_PRODUCTS)
};