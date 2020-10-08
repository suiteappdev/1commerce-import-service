const {
    GraphQLObjectType,
    GraphQLList
  } = require('graphql');
  
  const PrestashopProductVariationType = require('./prestashopProductVariation.type');
  const PrestashopProductVariationListType = new GraphQLObjectType({
    name: 'PrestashopProductVariationListType',
    fields: () => ({
      data: { type: new GraphQLList(PrestashopProductVariationType) },
    })
  });
  
  module.exports = PrestashopProductVariationListType;