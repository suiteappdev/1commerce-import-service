const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const WooCommerceProductType = require('./wooCommerceProduct.type');
const WooCommerceProductListType = new GraphQLObjectType({
  name: 'WooCommerceProductListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt },
    data: { type: new GraphQLList(WooCommerceProductType) },
  }),
});

module.exports = WooCommerceProductListType;
  