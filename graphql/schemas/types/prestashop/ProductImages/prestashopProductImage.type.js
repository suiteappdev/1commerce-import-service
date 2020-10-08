const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const path = require("path");

let PrestashopImageProductType = new GraphQLObjectType({
  name: 'PrestashopImageProductType',
  fields: () => ({
    file : { type: GraphQLString, resolve : (obj, args, context, info)=>{
    return obj.file;
    }},
    src : { type: GraphQLString , resolve : (obj, args, context, info)=>{
      return obj.src
    }},
  })
});

module.exports = PrestashopImageProductType;