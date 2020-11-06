const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const path = require("path");

let VtexProductImageType = new GraphQLObjectType({
  name: 'VtexProductImageType',
  fields: () => ({
    file : { type: GraphQLString, resolve : (obj, args, context, info)=>{
    return obj.ImageUrl.split('/')[6];
    }},
    src : { type: GraphQLString , resolve : (obj, args, context, info)=>{
      return obj.ImageUrl;
    }},
  })
});

module.exports = VtexProductImageType;