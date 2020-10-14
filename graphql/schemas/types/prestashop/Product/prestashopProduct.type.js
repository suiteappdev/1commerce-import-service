const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLFloat
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
      price:{ type:GraphQLInt, resolve : (obj, args, context, info)=>{
        let before_tax_price=obj.price ? parseInt(obj.price == "" ? 0 : obj.price) : 0;
        let tax_rate=obj.tax.rate ? parseInt(obj.tax.rate == "" ? 0 : obj.tax.rate) : 0;
        let full_price=(before_tax_price * (1 + ((tax_rate)/100)));
        return Math.ceil(full_price);
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