const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
  } = require('graphql');
  
  const WooCommerceProductCreatedTyPe = new GraphQLObjectType({  
    name: "WooCommerceProductCreatedTyPe",
    fields: () => ({
      productId: { type: new GraphQLNonNull(GraphQLID) },
      key: { type: new GraphQLNonNull(GraphQLString) },
      channel: { type: new GraphQLNonNull(GraphQLString) }
    })
  })
  
  module.exports = { WooCommerceProductCreatedTyPe };