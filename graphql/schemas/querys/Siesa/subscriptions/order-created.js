const { pubsub }  = require('../../../../../services/pubsub.service') ;
const { ORDER_CREATED }  = require('./events');

const { OrderType } = require('../mutations/create-order.mutation')

module.exports = {
  type: OrderType,
  subscribe: () => pubsub.asyncIterator(ORDER_CREATED)
};