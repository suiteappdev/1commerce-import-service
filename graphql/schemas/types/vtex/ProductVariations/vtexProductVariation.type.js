const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = require('graphql');
const { getEan, getQuantity } = require('../../../../../controllers/Vtex.controller');

let VtexProductVariationType = new GraphQLObjectType({
  name: 'VtexProductVariationType',
  fields: () => ({
    price:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.listPrice !== 0 ? (obj.listPrice / 100) : (obj.bestPrice / 100);
    }},
    talla:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.dimensions.Talla && obj.dimensions.Talla !== '' ? obj.dimensions.Talla : 'único';
    }},
    quantity:{ type:GraphQLInt, resolve: async(obj, args, context, info)=>{
      let quantity = await getQuantity(context.req, obj.sku);
      return quantity;
    }},
    reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.skuname ? obj.skuname : '';
    }},
    ean13:{ type:GraphQLString, resolve: async(obj, args, context, info)=>{
      let ean = obj.sku ? await getEan(context.req, obj.sku) : '';
      return ean;
    }}
  }),
});

module.exports = VtexProductVariationType;
