const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLFloat
  } = require('graphql');

const ShopifyProductCreatedTyPe = new GraphQLObjectType({  
    name: "ShopifyProductCreatedTyPe",
    fields: () => ({
      name: { type: new GraphQLNonNull(GraphQLString) },
      externalId: { type: new GraphQLNonNull(GraphQLID) },
      description:{ type: new GraphQLNonNull(GraphQLString) },
      reference: { type: new GraphQLNonNull(GraphQLID) },
      descriptionShort: { type: new GraphQLNonNull(GraphQLString) },
      active: { type: new GraphQLNonNull(GraphQLBoolean) },
      price: { type: new GraphQLNonNull(GraphQLInt) },
      manufacturer: { type: new GraphQLNonNull(GraphQLString) },
      width: { type: new GraphQLNonNull(GraphQLInt) },
      weight: { type: new GraphQLNonNull(GraphQLInt) },
      height: { type: new GraphQLNonNull(GraphQLInt) },
      length: { type: new GraphQLNonNull(GraphQLFloat) },
      identifier: { type: new GraphQLNonNull(GraphQLString) },
    })
})

module.exports = { ShopifyProductCreatedTyPe };