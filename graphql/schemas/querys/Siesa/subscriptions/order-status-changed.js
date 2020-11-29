const { pubsub }  = require('../../../../../services/pubsub.service') ;
const { ORDER_STATUS_CHANGED }  = require('./events');

const { OrderStatusChangedTyPe } = require('../../../types/siesa/Subscription/OrderStatusChangedType');

module.exports = {
  type: OrderStatusChangedTyPe,
  subscribe: () => pubsub.asyncIterator(ORDER_STATUS_CHANGED)
};