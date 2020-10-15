const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const ShopifyProductVariationType = require('./shopifyProductVariation.type');
let ShopifyProductVType = new GraphQLObjectType({
  name: 'ShopifyProductVType',
  fields: () => ({
    externalId: { type: GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.id;
    }},
    reference: { type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.id
    }},
    variations:{ type:new GraphQLList(ShopifyProductVariationType), resolve:(obj, args, context, info)=>{      
      return obj.variants.map(v => {
        v.options = obj.options;
        return v;
      })
    }},
  }),
});

module.exports = ShopifyProductVType;
