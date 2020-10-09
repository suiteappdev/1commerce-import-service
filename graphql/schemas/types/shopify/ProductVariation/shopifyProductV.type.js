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
      return obj.productId;
    }},
    variations:{ type:new GraphQLList(ShopifyProductVariationType), resolve:(obj, args, context, info)=>{      
      return obj.skus
    }},
  }),
});

module.exports = ShopifyProductVType;
