const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const MercadolibreProductVType = require('./mercadolibreProductV.type');
const MercadolibreProductVariationListType = new GraphQLObjectType({
  name: 'MercadolibreProductVariationListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt },
    data: { type: new GraphQLList(MercadolibreProductVType) },
  }),
});

module.exports = MercadolibreProductVariationListType;
