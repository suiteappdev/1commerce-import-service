const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const ShopifyCategoryType = require('./shopifyCategoryType');
const ShopifyImageType = require('./shopifyImageType');

let ShopifyProductVariationType = new GraphQLObjectType({
    name: 'ShopifyProductVariationType',
    fields: () => ({
      supplierreference:{ type:GraphQLString },
      ean13:{type:GraphQLInt},
      upc:{type:GraphQLInt}, 
      price:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.price ? parseInt(obj.price == "" ? 0 : obj.price) : 0
      }},
      gender:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return obj.options.filter((o)=>(o.name.toLowerCase() == 'genero' || o.name.toLowerCase() == 'gender' || o.name.toLowerCase() == 'género' ))[0].values[0];
      }}, //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
      talla:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
           return obj.options.filter((o)=>(o.name.toLowerCase() == 'talla'))[0].values[0];
      }}, //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
      quantity:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.inventory_quantity || 0
      }},
      reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return obj.sku
      }}
    }),
});

module.exports = ShopifyProductVariationType;