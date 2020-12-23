const {
    GraphQLObjectType,
    GraphQLList
} = require('graphql');
const path = require("path");
const PrestashopImgProductType = require('./prestashopProductImage.type');

let PrestashopImageProductType = new GraphQLObjectType({
  name: 'PrestashopImgProductType',
  fields: () => ({
    images : {  type:new GraphQLList(PrestashopImgProductType), resolve:(obj, args, context, info)=>{
        return obj;
    }},
  })
});

module.exports = PrestashopImageProductType;