const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} = require('graphql');

let WooCommerceCategoryType = new GraphQLObjectType({
    name: 'WooCommerceCategoryType',
    fields: () => ({
      id : { type: GraphQLString},
      name: { type: GraphQLString},
      slug: { type: GraphQLString},
    }),
});

module.exports = WooCommerceCategoryType;