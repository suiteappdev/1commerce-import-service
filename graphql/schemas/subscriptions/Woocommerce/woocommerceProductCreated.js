const { pubsub }  = require('../../../../services/pubsub.service') ;
const { WOOCOMMERCE_PRODUCT_CREATED }  = require('../events');

const { WooCommerceProductCreatedTyPe } = require('../../types/subscription/woocommerceProductCreatedType');

module.exports = {
  type: WooCommerceProductCreatedTyPe,
  subscribe: () => pubsub.asyncIterator(WOOCOMMERCE_PRODUCT_CREATED)
};