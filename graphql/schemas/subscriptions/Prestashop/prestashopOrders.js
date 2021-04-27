const { pubsub }  = require('../../../../services/pubsub.service') ;
const { PRESTASHOP_ORDERS }  = require('../events');

const { PrestashopOrdersType } = require('../../types/subscription/prestashopOrdersType');

module.exports = {
  type: PrestashopOrdersType,
  subscribe: () => pubsub.asyncIterator(PRESTASHOP_ORDERS)
};