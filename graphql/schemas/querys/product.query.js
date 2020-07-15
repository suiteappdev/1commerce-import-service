const {
    GraphQLList
} = require('graphql');

const { getProducts } = require('../../../controllers/WooCommerce.controller');

const ProductType  = require('../types/product.type');

let ProductListQuery = {
    type:  new GraphQLList(ProductType),
    resolve: (context) => {
        return getProducts()
    },
};
  
module.exports = ProductListQuery;