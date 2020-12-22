const { pubsub }  = require('../../../../services/pubsub.service') ;
const { WOOCOMMERCE_PRODUCTS}  = require('../events');

const { WoocommerceProductsTyPe } = require('../../types/subscription/woocommerceProductsType');

module.exports = {
  type: WoocommerceProductsTyPe,
  subscribe: () => pubsub.asyncIterator(WOOCOMMERCE_PRODUCTS)
};