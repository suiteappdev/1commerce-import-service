const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const mercadolibreProductImg = require('./mercadolibreProductImg.type');
const MercadolibreProductImageListType = new GraphQLObjectType({
  name: 'MercadolibreProductImageListType',
  fields: () => ({
    totalRecords: { type: GraphQLInt },
    pagesCount: { type: GraphQLInt },
    data: { type: new GraphQLList(mercadolibreProductImg) },
  }),
});

module.exports = MercadolibreProductImageListType;
