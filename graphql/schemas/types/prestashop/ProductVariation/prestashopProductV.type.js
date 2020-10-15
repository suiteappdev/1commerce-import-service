const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const PrestashopProductVariationType = require('./prestashopProductVariation.type');
let PrestashopProductVType = new GraphQLObjectType({
  name: 'PrestashopProductVType',
  fields: () => ({
    externalId: { type: GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.external_id;
    }},
    reference: { type: GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.reference ? obj.reference.trim() : "";
    }},
    variations:{ type:new GraphQLList(PrestashopProductVariationType), resolve:(obj, args, context, info)=>{      
      return obj.variations
    }},
  }),
});

module.exports = PrestashopProductVType;