const { pubsub }  = require('../../../../services/pubsub.service') ;
const { PRESTASHOP_PRODUCTS }  = require('../events');

const { PrestashopProductsTyPe } = require('../../types/subscription/prestashopProductsType');

module.exports = {
  type: PrestashopProductsTyPe,
  subscribe: () => pubsub.asyncIterator(PRESTASHOP_PRODUCTS)
};