const { pubsub }  = require('../../../../services/pubsub.service') ;
const { SHOPIFY_PRODUCT_CREATED }  = require('../events');

const { ShopifyProductCreatedTyPe } = require('../../types/subscription/shopifyProductCreatedType');

module.exports = {
  type: ShopifyProductCreatedTyPe,
  subscribe: () => pubsub.asyncIterator(SHOPIFY_PRODUCT_CREATED)
};