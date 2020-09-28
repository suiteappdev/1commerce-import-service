const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql');

const WooCommerceProductImageType = require('./WooCommerceProductImage.type');
const WooCommerceProductImageListType = new GraphQLObjectType({
  name: 'WooCommerceProductImageListType',
  fields: () => ({
    data: { type: new GraphQLList(WooCommerceProductImageType) },
  })
});

module.exports = WooCommerceProductImageListType;
