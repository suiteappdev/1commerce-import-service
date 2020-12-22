const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const VtexProductsTyPe = new GraphQLObjectType({  
  name: "VtexProductsTyPe",
  fields: () => ({
    productId: { type: new GraphQLNonNull(GraphQLID) },
    key: { type: new GraphQLNonNull(GraphQLString) },
    channel: { type: new GraphQLNonNull(GraphQLString) }
  })
})

module.exports = { VtexProductsTyPe };