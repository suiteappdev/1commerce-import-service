const {
  GraphQLObjectType
} = require('graphql');

const VtexProduct = require('../Product/vtexProduct.type');
const VtexProductVType = require('../ProductVariations/vtexProductV.type');
const VtexProductImg = require('../ProductImages/vtexProductI.type');

let VtexProductIdType = new GraphQLObjectType({
  name: 'VtexProductIdType',
  fields: () => ({
    product: {type: VtexProduct, resolve: (obj, args, context, info) => {
      return obj;
    }},
    productVariations: {type: VtexProductVType, resolve: (obj, args, context, info) => {
      return obj;
    }},
    productImages: {type: VtexProductImg, resolve: (obj, args, context, info) => {
      return obj;
    }},
  }),
});

module.exports = VtexProductIdType;