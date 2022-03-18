const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql');

const WoocommerceProductIdType = require('./woocommerceProductId.type');
const WoocommerceProductIdListType = new GraphQLObjectType({
  name: 'WoocommerceProductIdListType',
  fields: () => ({
    data: { type: new GraphQLList(WoocommerceProductIdType) },
  }),
});

module.exports = WoocommerceProductIdListType;