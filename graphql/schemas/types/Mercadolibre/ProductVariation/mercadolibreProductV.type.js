const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');
const MercadolibreProductVariationType = require('./mercadolibreProductVariation.type');
const MercadolibreDiscountType = require('./mercadolibreDiscount.type');

let MercadolibreProductVType = new GraphQLObjectType({
  name: 'MercadolibreProductVType',
  fields: () => ({
    externalId: { type: GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.id;
    }},
    reference: { type: GraphQLString, resolve: (obj, args, context, info) => {
      const model = obj.attributes.find(attr => attr.id === 'MODEL');
      return model ? model.value_name : '';
    }},
    discount: {type: new GraphQLList(MercadolibreDiscountType),resolve: async (obj, args, context, info)=>{
      let disc = [];
      return disc
    }},
    variations:{ type:new GraphQLList(MercadolibreProductVariationType), resolve:(obj, args, context, info)=>{      
      if (!obj.variations || obj.variations.length === 0) {
        return [{}]
      }
      return obj.variations
    }},
  }),
});

module.exports = MercadolibreProductVType;
