const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const VtexProductVType = require('./vtexProductV.type');
const VtexProductVariationListType = new GraphQLObjectType({
  name: 'VtexProductVariationListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt },
    data: { type: new GraphQLList(VtexProductVType) },
  }),
});

module.exports = VtexProductVariationListType;