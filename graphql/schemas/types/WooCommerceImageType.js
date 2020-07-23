const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');
const path = require("path");

let WooCommerceImageType = new GraphQLObjectType({
    name: 'WooCommerceImageType',
    fields: () => ({
      file : { type: GraphQLString, resolve : (obj, args, context, info)=>{
      return `${obj.name}${path.extname(obj.src)}` ;
      }},
      position : { type: GraphQLInt},
      cover: { type: GraphQLInt},
      src : { type: GraphQLString , resolve : (obj, args, context, info)=>{
        return obj.src
      }},
      product: { type: GraphQLInt}
    }),
});

module.exports = WooCommerceImageType;