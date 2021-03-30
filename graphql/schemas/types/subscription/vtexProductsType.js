const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} = require('graphql');

const VtexProductsTyPe = new GraphQLObjectType({  
  name: "VtexProductsTyPe",
  fields: () => ({
    productId: { type: new GraphQLNonNull(GraphQLID) },
    key: { type: new GraphQLNonNull(GraphQLString) },
    channel: { type: new GraphQLNonNull(GraphQLString) },
    discount: { type: new GraphQLNonNull(GraphQLBoolean) }
  })
})

module.exports = { VtexProductsTyPe };