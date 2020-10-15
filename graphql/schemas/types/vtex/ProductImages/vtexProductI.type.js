const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const VtexProductImageType = require('./vtexProductImage.type');
let VtexProductIType = new GraphQLObjectType({
  name: 'VtexProductIType',
  fields: () => ({
    externalId: { type: GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.ProductId;
    }},
    images:{ type:new GraphQLList(VtexProductImageType), resolve:(obj, args, context, info)=>{      
      return obj.Images
    }},
  }),
});

module.exports = VtexProductIType;