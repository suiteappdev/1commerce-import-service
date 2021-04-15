const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const ShopifyOrdersType = new GraphQLObjectType({  
  name: "ShopifyOrdersType",
  fields: () => ({
    orderId: { type: new GraphQLNonNull(GraphQLID) },
    key: { type: new GraphQLNonNull(GraphQLString) },
    channel: { type: new GraphQLNonNull(GraphQLString) }
  })
})

module.exports = { ShopifyOrdersType };
