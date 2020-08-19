const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');
const path = require("path");
var url = require("url");
let ShopifyImageType = new GraphQLObjectType({
    name: 'ShopifyImageType',
    fields: () => ({
      file : { type: GraphQLString, resolve : (obj, args, context, info)=>{
        var parsed = url.parse(obj.src);
        return path.basename(parsed.pathname) ;
      }},
      position : { type: GraphQLInt},
      cover: { type: GraphQLInt},
      src : { type: GraphQLString , resolve : (obj, args, context, info)=>{
        return obj.src
      }}
    }),
});

module.exports = ShopifyImageType;