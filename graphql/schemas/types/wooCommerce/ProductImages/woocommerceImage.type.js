const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const path = require("path");

let WooCommerceProductImageType = new GraphQLObjectType({
  name: 'WooCommerceProductImageType',
  fields: () => ({
    file : { type: GraphQLString, resolve : (obj, args, context, info)=>{
      return `${obj.name}${path.extname(obj.src)}`;
    }},
    src : { type: GraphQLString , resolve : (obj, args, context, info)=>{
      return obj.src
    }},
  })
});

module.exports = WooCommerceProductImageType;