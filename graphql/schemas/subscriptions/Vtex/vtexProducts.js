const { pubsub }  = require('../../../../services/pubsub.service') ;
const { VTEX_PRODUCTS }  = require('../events');

const { VtexProductsTyPe } = require('../../types/subscription/vtexProductsType');

module.exports = {
  type: VtexProductsTyPe,
  subscribe: () => pubsub.asyncIterator(VTEX_PRODUCTS)
};