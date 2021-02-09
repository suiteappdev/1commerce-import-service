const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql');

const WooCommerceProductVariationType = require('./wooCommerceProductVariation.type');
const WooCommerceProductType = require('../Product/wooCommerceProduct.type');
const WooCommerceProductVariationListType = new GraphQLObjectType({
  name: 'WooCommerceProductVariationListType',
  fields: () => ({
    data: { type: new GraphQLList(WooCommerceProductType), resolve:(obj, args, context, info)=>{
      return obj;
    }},
  })
});

module.exports = WooCommerceProductVariationListType;
