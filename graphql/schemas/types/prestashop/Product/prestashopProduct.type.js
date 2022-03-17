const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList
  } = require('graphql');
  

  const stripHtml = require("string-strip-html");
  const PrestashopTaxType =  require('./prestashopTaxType');
  const PrestashopImageProductType = require('../ProductImages/prestashopProductImage.type');
  
  let PrestashopProductType = new GraphQLObjectType({
    name: 'PresthashopProductType',
    fields: () => ({
      name: {type: GraphQLString, resolve: (obj, args, context, info) => {
          return obj.name
      }},
      externalId: { type: GraphQLString,  resolve:(obj, args, context, info)=>{
          return obj.id.toString();
      }},  
      reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return obj.reference ? obj.reference.trim() : "";
      }}, //Referencia del Producto  
      description:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return stripHtml(obj.description)
      }}, //Descripción del Producto o Descripción técnica
      descriptionShort:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return stripHtml(obj.description_short)
      }}, //Descripción Corta o Descripción comercial
      active:{ type:GraphQLBoolean, resolve:(obj, args, context, info)=>{
        return obj.active == '1' ? true : false
      }}, //Estado del Producto
      color: { type:GraphQLString, resolve : (obj, args, context, info)=>{
        return obj.color;
      }}, 
      tax:{ type:PrestashopTaxType, resolve : (obj, args, context, info)=>{
        return obj.tax;
      }},
      manufacturer:{ type:GraphQLString, resolve : (obj, args, context, info)=>{
        return obj.manufacturer_name;
      }}, 
      width:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return parseInt(obj.width);
      }}, //Ancho del Empaque del producto
      height:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return parseInt(obj.height);
      }}, //Alto del Empaque del producto
      length:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return parseInt(obj.depth);
      }}, //Largo del Empaque del Producto
      weight:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return parseInt(obj.weight);
      } }, //Peso del Empaque del Producto
      images:{ type:new GraphQLList(PrestashopImageProductType), resolve:(obj, args, context, info)=>{
        return obj.images;
      }},
    }),
  });
  
  module.exports = PrestashopProductType;