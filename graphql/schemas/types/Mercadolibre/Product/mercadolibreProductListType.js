const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const MercadolibreProductType = require('./mercadolibreProduct.type');
const MercadolibreProductListType = new GraphQLObjectType({
name: 'MercadolibreProductListType',
fields: () => ({
  totalRecords: { type: GraphQLInt },
  pagesCount: { type: GraphQLInt },
  data: { type: new GraphQLList(MercadolibreProductType) },
}),
});

module.exports = MercadolibreProductListType;
