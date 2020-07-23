const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const WooCommerceCategoryType = require('./wooCommerceCategoryType');
const WooCommerceImageType = require('./WooCommerceImageType');

let WooCommerceProductVariationType = new GraphQLObjectType({
    name: 'WooCommerceProductVariationType',
    fields: () => ({
      supplierreference:{ type:GraphQLString },
      ean13:{type:GraphQLInt},
      upc:{type:GraphQLInt}, 
      price:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.price
      }},
      quantity:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.stock_quantity || 0
      }},
      reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        console.log("obj", obj)
        return obj.sku
      }}
    }),
});

module.exports = WooCommerceProductVariationType;