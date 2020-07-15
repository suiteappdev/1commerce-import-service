const {
    GraphQLList
} = require('graphql');

const { getProducts } = require('../../../controllers/WooCommerce.controller');

const WooCommerceProductType  = require('../types/wooCommerceProduct.type');

let WooCommerceProductListQuery = {
    type:  new GraphQLList(WooCommerceProductType),
    resolve: (context) => {
        return getProducts()
    },
};
  
module.exports = WooCommerceProductListQuery;