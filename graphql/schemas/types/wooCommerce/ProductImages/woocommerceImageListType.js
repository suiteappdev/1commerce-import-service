const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const woocommerceProductImg = require('./woocommerceProductImg.type');
const WoocommerceProductImageListType = new GraphQLObjectType({
  name: 'WoocommerceProductImageListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt },
    data: { type: new GraphQLList(woocommerceProductImg) },
  }),
});

module.exports = WoocommerceProductImageListType;
