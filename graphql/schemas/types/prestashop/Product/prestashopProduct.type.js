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
  
  let PrestashopProductType = new GraphQLObjectType({
    name: 'PresthashopProductType',
    fields: () => ({
      name: {type: GraphQLString, resolve: (obj, args, context, info) => {
          return obj.name[0].value
      }},
      externalId: { type: GraphQLString,  resolve:(obj, args, context, info)=>{
          return obj.id.toString();
      }},  
      reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return obj.reference
      }}, //Referencia del Producto  
      description:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return stripHtml(obj.description[0].value)
      }}, //Descripción del Producto o Descripción técnica
      descriptionShort:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return stripHtml(obj.description_short[0].value)
      }}, //Descripción Corta o Descripción comercial
      active:{ type:GraphQLBoolean, resolve:(obj, args, context, info)=>{
        return obj.status == "1" ? true : false
      }}, //Estado del Producto
      price:{ type:GraphQLInt, resolve : (obj, args, context, info)=>{
        return obj.price ? parseInt(obj.price == "" ? 0 : obj.price) : 0
      }},
      tax:{ type:GraphQLInt, resolve : (obj, args, context, info)=>{
        return obj.id_tax_rules_group;
      }},
      manufacturer:{ type:GraphQLString, resolve : (obj, args, context, info)=>{
        return obj.manufacturer_name;
      }}, 
      width:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        // console.log(obj.width);
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
      images:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return parseInt(obj.id_default_image == "" ?  0 : obj.id_default_image );
      }},
    }),
  });
  
  module.exports = PrestashopProductType;