const { pubsub }  = require('../../../../services/pubsub.service') ;
const { WOOCOMMERCE_ORDERS}  = require('../events');

const { WoocommerceOrderTyPe } = require('../../types/subscription/woocommerceOrderType');

module.exports = {
  type: WoocommerceOrderTyPe,
  subscribe: () => pubsub.asyncIterator(WOOCOMMERCE_ORDERS)
};