const {
  GraphQLObjectType
} = require('graphql');

const WoocommerceProduct = require('../Product/wooCommerceProduct.type');
const WoocommerceProductVType = require('../ProductVariations/woocommerceProductV.type');
const WoocommerceProductImg = require('../ProductImages/woocommerceProductImg.type');

let WoocommerceProductIdType = new GraphQLObjectType({
  name: 'WoocommerceProductIdType',
  fields: () => ({
    product: {type: WoocommerceProduct, resolve: (obj, args, context, info) => {
      return obj;
    }},
    productVariations: {type: WoocommerceProductVType, resolve: (obj, args, context, info) => {
      return obj;
    }},
    productImages: {type: WoocommerceProductImg, resolve: (obj, args, context, info) => {
      return obj;
    }},
  }),
});

module.exports = WoocommerceProductIdType;
