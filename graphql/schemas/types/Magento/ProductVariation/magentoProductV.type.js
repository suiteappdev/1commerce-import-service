const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');
const MagentoProductVariationType = require('./magentoProductVariation.type');
const MagentoDiscountType = require('./magentoDiscount.type');

let MagentoProductVType = new GraphQLObjectType({
  name: 'MagentoProductVType',
  fields: () => ({
    externalId: { type: GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.id;
    }},
    reference: { type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.sku
    }},
    discount: {type: new GraphQLList(MagentoDiscountType),resolve: async (obj, args, context, info)=>{
      let disc = [];
      return disc
    }},
    variations:{ type:new GraphQLList(MagentoProductVariationType), resolve:(obj, args, context, info)=>{      
      if (!obj.variants || obj.variants.length === 0) {
        return [{}]
      }
      return obj.variants
    }},
  }),
});

module.exports = MagentoProductVType;
