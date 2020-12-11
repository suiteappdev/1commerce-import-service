const {
  GraphQLObjectType
} = require('graphql');

const shopifyProduct = require('../Product/shopifyProduct.type');
const ShopifyProductVType = require('../ProductVariation/shopifyProductV.type');
const shopifyProductImg = require('../ProductImages/shopifyProductImg.type');

let ShopifyProductIdType = new GraphQLObjectType({
  name: 'ShopifyProductIdType',
  fields: () => ({
    product: {type: shopifyProduct, resolve: (obj, args, context, info) => {
      return obj;
    }},
    productVariations: {type: ShopifyProductVType, resolve: (obj, args, context, info) => {
      return obj;
    }},
    productImages: {type: shopifyProductImg, resolve: (obj, args, context, info) => {
      return obj;
    }},
  }),
});

module.exports = ShopifyProductIdType;