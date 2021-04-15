const { pubsub }  = require('../../../../services/pubsub.service') ;
const { VTEX_ORDERS }  = require('../events');

const { VtexOrdersType } = require('../../types/subscription/vtexOrdersType');

module.exports = {
  type: VtexOrdersType,
  subscribe: () => pubsub.asyncIterator(VTEX_ORDERS)
};
