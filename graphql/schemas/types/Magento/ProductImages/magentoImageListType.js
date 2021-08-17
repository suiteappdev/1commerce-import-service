const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const magentoProductImg = require('./magentoProductImg.type');
const MagentoProductImageListType = new GraphQLObjectType({
  name: 'MagentoProductImageListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt },
    data: { type: new GraphQLList(magentoProductImg) },
  }),
});

module.exports = MagentoProductImageListType;
