const {
  GraphQLObjectType
} = require('graphql');

const ShopifyProduct = require('../Product/shopifyProduct.type');
const ShopifyProductVType = require('../ProductVariation/shopifyProductV.type');
const ShopifyProductImg = require('../ProductImages/shopifyProductImg.type');

let ShopifyProductIdType = new GraphQLObjectType({
  name: 'ShopifyProductIdType',
  fields: () => ({
    product: {type: ShopifyProduct, resolve: (obj, args, context, info) => {
      return obj;
    }},
    productVariations: {type: ShopifyProductVType, resolve: (obj, args, context, info) => {
      return obj;
    }},
    productImages: {type: ShopifyProductImg, resolve: (obj, args, context, info) => {
      return obj;
    }},
  }),
});

module.exports = ShopifyProductIdType;