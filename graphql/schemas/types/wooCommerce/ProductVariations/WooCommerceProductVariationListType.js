const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} = require('graphql');

const WoocommerceProductVType = require('./woocommerceProductV.type');

const WooCommerceProductVariationListType = new GraphQLObjectType({
  name: 'WooCommerceProductVariationListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt },
    data: { type: new GraphQLList(WoocommerceProductVType) },
  }),
});

module.exports = WooCommerceProductVariationListType;
