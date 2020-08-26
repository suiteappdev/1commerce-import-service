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
        if(( obj.attributes &&  obj.attributes.length > 0 )){
          let attrs = obj.attributes;
          let gender = attrs.filter(o=>(o.name.toLowerCase() === 'gender' || o.name.toLowerCase() === 'genero' || o.name.toLowerCase() === 'género'));

          if(gender.length > 0)
            return gender[0].options[0];
          else
            return null;
        }

        return null;
      }}, //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
      talla:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        if(( obj.attributes &&  obj.attributes.length > 0 )){
          let attrs = obj.attributes;
          let size = attrs.filter(o=>(o.name.toLowerCase() === 'talla' || o.name.toLowerCase() === 'tamaño' || o.name.toLowerCase() === 'size'));

          if(size.length > 0)
            return size[0].option;
          else
            return null;
        }

        return null;
   
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