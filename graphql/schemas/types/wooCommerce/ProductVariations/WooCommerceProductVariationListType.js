const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql');

const WooCommerceProductVariationType = require('./wooCommerceProductVariation.type');
const WooCommerceProductVariationListType = new GraphQLObjectType({
  name: 'WooCommerceProductVariationListType',
  fields: () => ({
    data: { type: new GraphQLList(WooCommerceProductVariationType) },
  })
});

module.exports = WooCommerceProductVariationListType;
