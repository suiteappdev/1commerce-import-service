const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

let WooCommerceImageType = new GraphQLObjectType({
    name: 'WooCommerceImageType',
    fields: () => ({
      id : { type: GraphQLInt},
      name : { type: GraphQLString},
      src: { type: GraphQLString},
      alt: { type: GraphQLString},
    }),
});

module.exports = WooCommerceImageType;