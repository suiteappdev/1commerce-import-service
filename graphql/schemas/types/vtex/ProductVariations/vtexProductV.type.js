const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const VtexProductVariationType = require('./vtexProductVariation.type');
let VtexProductVType = new GraphQLObjectType({
  name: 'VtexProductVType',
  fields: () => ({
    externalId: { type: GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.productId;
    }},
    reference: { type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.productId
    }},
    variations:{ type:new GraphQLList(VtexProductVariationType), resolve:(obj, args, context, info)=>{ 
      if (!obj.skus || obj.skus.length === 0) {
        return [{dimensions: {Talla: 'único'}}]
      }

      return obj.skus
    }},
  }),
});

module.exports = VtexProductVType;