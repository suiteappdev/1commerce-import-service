const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');
const moment = require('moment');
const ShopifyProductVariationType = require('./shopifyProductVariation.type');
const ShopifyDiscountType = require('./shopifyDiscount.type');
let ShopifyProductVType = new GraphQLObjectType({
  name: 'ShopifyProductVType',
  fields: () => ({
    externalId: { type: GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.id;
    }},
    reference: { type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.id
    }},
    discount: {type: new GraphQLList(ShopifyDiscountType),resolve:(obj, args, context, info)=>{
      let disc = [];
      if (obj.variants[0].compare_at_price) {
        disc = [{
          name: obj.title,
          from: moment().format('YYYY/MM/DD'),
          to: moment().add(7, 'days').format('YYYY/MM/DD'),
          type: 'C',
          value: obj.variants[0].compare_at_price - obj.variants[0].price,
        }]
      }
      return disc
    }},
    variations:{ type:new GraphQLList(ShopifyProductVariationType), resolve:(obj, args, context, info)=>{      
      if (!obj.variants || obj.variants.length === 0) {
        return [{}]
      }
      return obj.variants.map(v => {
        v.options = obj.options;
        return v;
      })
    }},
  }),
});

module.exports = ShopifyProductVType;
