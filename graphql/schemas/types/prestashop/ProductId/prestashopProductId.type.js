const {
    GraphQLObjectType
  } = require('graphql');
  
  const PrestashopProduct = require('../Product/prestashopProduct.type');
  const PrestashopProductVType = require('../ProductVariation/prestashopProductV.type');
  const PrestashopProductImages = require('../ProductImages/prestashopImageListType');
  
  let PrestashopProductIdType = new GraphQLObjectType({
    name: 'PrestashopProductIdType',
    fields: () => ({
      product: {type: PrestashopProduct, resolve: (obj, args, context, info) => {
        return obj;
      }},
      productVariations: {type: PrestashopProductVType, resolve: (obj, args, context, info) => {
        return obj.variations;
      }},
      productImages: {type: PrestashopProductImages, resolve:(obj, args, context, info)=>{
        return obj.images;
      }},
    }),
  });
  
  module.exports = PrestashopProductIdType;