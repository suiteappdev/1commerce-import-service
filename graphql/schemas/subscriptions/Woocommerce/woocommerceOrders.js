const { pubsub }  = require('../../../../services/pubsub.service') ;
const { WOOCOMMERCE_ORDERS}  = require('../events');

const { WoocommerceOrdersType } = require('../../types/subscription/woocommerceOrderType');

module.exports = {
  type: WoocommerceOrdersType,
  subscribe: () => pubsub.asyncIterator(WOOCOMMERCE_ORDERS)
};