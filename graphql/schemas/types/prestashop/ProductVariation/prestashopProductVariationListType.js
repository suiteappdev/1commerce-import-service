const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt
  } = require('graphql');
  
  const PrestashopProductVType = require('./prestashopProductV.type');
  const PrestashopProductVariationListType = new GraphQLObjectType({
    name: 'PrestashopProductVariationListType',
    fields: () => ({
      totalRecords: { type: GraphQLInt },
      pagesCount: { type: GraphQLInt },
      data: { type: new GraphQLList(PrestashopProductVType) },
    })
  });
  
  module.exports = PrestashopProductVariationListType;