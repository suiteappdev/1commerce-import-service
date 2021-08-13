const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const MagentoProductVType = require('./magentoProductV.type');
const MagentoProductVariationListType = new GraphQLObjectType({
  name: 'MagentoProductVariationListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt },
    data: { type: new GraphQLList(MagentoProductVType) },
  }),
});

module.exports = MagentoProductVariationListType;
