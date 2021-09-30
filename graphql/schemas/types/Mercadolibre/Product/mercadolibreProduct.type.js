const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat
} = require('graphql');
const stripHtml = require("string-strip-html");

let MercadolibreProductType = new GraphQLObjectType({
  name: 'MercadolibreProductType',
  fields: () => ({
    name: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.title
    }},
    externalId: { type: GraphQLString,  resolve:(obj, args, context, info)=>{
      return obj.id
    }},
    reference: {type: GraphQLString, resolve: (obj, args, context, info) => {
      const model = obj.attributes.find(attr => attr.id === 'MODEL');
      return model ? model.value_name : '';
    }},
    description: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return stripHtml(obj.description || obj.title)
    }},
    descriptionShort: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return stripHtml(obj.description || obj.title)
    }},
    active: {type: GraphQLBoolean, resolve: (obj, args, context, info) => {
      return obj.status === 'active' ? true : false
    }},
    manufacturer: {type: GraphQLString, resolve: (obj, args, context, info) => {
      const brand = obj.attributes.find(attr => attr.id === 'BRAND');
      return brand ? brand.value_name : '';
    }},
    width: {type: GraphQLInt, resolve: (obj, args, context, info) => {
      return 0;
    }},
    height: {type: GraphQLInt, resolve: (obj, args, context, info) => {
      return 0;
    }},
    length: {type: GraphQLInt, resolve: (obj, args, context, info) => {
      return 0;
    }},
    weight: {type: GraphQLFloat, resolve: (obj, args, context, info) => {
      return 0;
    }}
  }),
});

module.exports = MercadolibreProductType;