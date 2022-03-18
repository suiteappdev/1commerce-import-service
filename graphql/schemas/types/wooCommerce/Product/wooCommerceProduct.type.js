const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} = require('graphql');

const WoocommerceTaxType =  require('./WooCommerceTaxType');
const stripHtml = require("string-strip-html");

let WooCommerceProductType = new GraphQLObjectType({
  name: 'WooCommerceProductType',
    fields: () => ({
      name: { type: GraphQLString},
      externalId: { type: GraphQLString,  resolve:(obj, args, context, info)=>{
        return obj.id.toString();
      }},
      simple: { type: GraphQLBoolean,  resolve:(obj, args, context, info)=>{
        return obj.type == 'simple' ? true : false;
      }},
      reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return obj.sku
      }}, //Referencia del Producto
      description:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return stripHtml(obj.description)
      }}, //Descripción del Producto o Descripción técnica
      descriptionShort:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return stripHtml(obj.short_description)
      }}, //Descripción Corta o Descripción comercial
      active:{ type:GraphQLBoolean, resolve:(obj, args, context, info)=>{
        return obj.status == "publish" ? true : false
      }}, //Estado del Producto
      tax:{ type:WoocommerceTaxType, resolve : (obj, args, context, info)=>{
        return obj.tax || {};
      }},
      manufacturer:{ type:GraphQLString, resolve : (obj, args, context, info)=>{
        if(obj.brands){
          return obj.brands[0].name;
        }
        if(( obj.attributes &&  obj.attributes.length > 0 )){
          let attrs = obj.attributes;
          let manufacturer = attrs.filter(o=>o.name.toLowerCase() === 'marca');

          if(manufacturer.length > 0)
            return manufacturer[0].options[0];
          else
            return null;
        }
      }}, 
      width:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.dimensions ? parseInt(obj.dimensions.width == "" ? 0 : obj.dimensions.width) : 0;
      }}, //Ancho del Empaque del producto
      height:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.dimensions ? parseInt(obj.dimensions.height == "" ? 0 : obj.dimensions.width) : 0;
      }}, //Alto del Empaque del producto
      length:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.dimensions ? (obj.dimensions.length.length > 0 ? parseInt(obj.dimensions.length) : 0) : 0
      }}, //Largo del Empaque del Producto
      weight:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.weight ? parseInt(obj.weight == "" ?  0 : obj.weight ) : 0;
      }}, //Peso del Empaque del Producto
    }),
});
module.exports = WooCommerceProductType;