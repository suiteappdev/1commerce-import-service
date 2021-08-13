const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const MagentoProductType = require('./magentoProduct.type');
const MagentoProductListType = new GraphQLObjectType({
name: 'MagentoProductListType',
fields: () => ({
  totalRecords: { type: GraphQLInt },
  pagesCount: { type: GraphQLInt },
  data: { type: new GraphQLList(MagentoProductType) },
}),
});

module.exports = MagentoProductListType;
