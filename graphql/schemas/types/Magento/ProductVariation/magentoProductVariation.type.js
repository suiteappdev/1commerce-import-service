const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');
const {getStockItem} = require('../../../../../controllers/Magento.controller');


let MagentoProductVariationType = new GraphQLObjectType({
  name: 'MagentoProductVariationType',
  fields: () => ({
    price:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.price ? obj.price : 0
    }},
    talla:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.size ? obj.size : 'único'
    }},
    quantity:{ type:GraphQLInt, resolve: (obj, args, context, info)=>{
      return getStockItem(context.req, obj.sku)
    }},
    reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.sku ? obj.sku : ''
    }},
    ean13:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return '0'
    }}
  }),
});

module.exports = MagentoProductVariationType;
