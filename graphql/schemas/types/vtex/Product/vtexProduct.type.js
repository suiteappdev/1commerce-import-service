const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat
} = require('graphql');

const stripHtml = require("string-strip-html");

let VtexProductType = new GraphQLObjectType({
  name: 'VtexProductType',
  fields: () => ({
    name: { type: GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.Name;
    }},
    externalId: { type: GraphQLString,  resolve:(obj, args, context, info)=>{
      return obj.Id;
    }},
    reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.RefId;
    }},
    description:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return stripHtml(obj.Description);
    }},
    descriptionShort:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return stripHtml(obj.DescriptionShort);
    }},
    active:{ type:GraphQLBoolean, resolve:(obj, args, context, info)=>{
      return obj.IsActive;
    }},
    price:{ type:GraphQLInt, resolve : (obj, args, context, info)=>{
      return obj.price;
    }}, 
    tax:{ type:GraphQLInt, resolve : (obj, args, context, info)=>{
      return obj.tax;
    }},
    manufacturer: { type:GraphQLString, resolve : (obj, args, context, info)=>{
      return obj.Brand;
    }},
    width:{ type:GraphQLFloat, resolve:(obj, args, context, info)=>{
      return obj.width;
    }},
    height:{ type:GraphQLFloat, resolve:(obj, args, context, info)=>{
      return obj.height;
    }},
    length:{ type:GraphQLFloat, resolve:(obj, args, context, info)=>{
      return obj.length;
    }},
    weight:{ type:GraphQLFloat, resolve:(obj, args, context, info)=>{
      return obj.weight;
    }}
  }),
});

module.exports = VtexProductType;