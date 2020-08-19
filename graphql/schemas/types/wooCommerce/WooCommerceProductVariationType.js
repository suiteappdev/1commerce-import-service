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
        return obj.price ? parseInt(obj.price == "" ? 0 : obj.price) : 0
      }},
      gender:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
          return obj.attributes.length > 0 ?  obj.attributes.filter((o)=>
          (o.name.toLowerCase() === 'gender' ) 
          || (o.name.toLowerCase() === 'genero')
          )[0].option: ""
      }}, //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
      talla:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
           return obj.attributes.length > 0 ?  obj.attributes.filter((o)=>
            (o.name.toLowerCase() === 'talla' ) 
            || (o.name.toLowerCase() === 'Talla') 
            || (o.name.toLowerCase() === 'size')
            || (o.name.toLowerCase() === 'tamaño')
            )[0].option: ""
   
      }}, //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
      quantity:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.stock_quantity || 0
      }},
      reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return obj.sku
      }}
    }),
});

module.exports = WooCommerceProductVariationType;