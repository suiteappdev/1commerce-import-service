const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');
const moment = require('moment');
const VtexProductVariationType = require('./vtexProductVariation.type');
const VtexDiscountType = require('./vtexDiscount.type');

let VtexProductVType = new GraphQLObjectType({
  name: 'VtexProductVType',
  fields: () => ({
    externalId: { type: GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.productId;
    }},
    reference: { type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.productId
    }},
    discount: {type: new GraphQLList(VtexDiscountType),resolve: async (obj, args, context, info)=>{
      return obj.discounts
    }},
    variations:{ type:new GraphQLList(VtexProductVariationType), resolve:(obj, args, context, info)=>{ 
      if (!obj.skus || obj.skus.length === 0) {
        return []
      } else {
        let sku = obj.skus.find(sku => sku.available === true);
        let price = sku.listPrice !== 0 ? sku.listPrice : sku.bestPrice;
        return obj.skus.map(sku => {
          if (sku.available === false) {
            sku.bestPrice = price;
          }
          return sku;
        })
      }
    }},
  }),
});

module.exports = VtexProductVType;