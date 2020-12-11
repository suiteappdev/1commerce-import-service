const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const WoocommerceProductsTyPe = new GraphQLObjectType({  
  name: "WoocommerceProductsTyPe",
  fields: () => ({
    productId: { type: new GraphQLNonNull(GraphQLID) },
    key: { type: new GraphQLNonNull(GraphQLString) },
    channel: { type: new GraphQLNonNull(GraphQLString) }
  })
})

module.exports = { WoocommerceProductsTyPe };
