const { pubsub }  = require('../../../../services/pubsub.service') ;
const { SHOPIFY_ORDERS }  = require('../events');

const { ShopifyOrdersType } = require('../../types/subscription/shopifyOrdersType');

module.exports = {
  type: ShopifyOrdersType,
  subscribe: () => pubsub.asyncIterator(SHOPIFY_ORDERS)
};