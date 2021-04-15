const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
  } = require('graphql');
  
  const WoocommerceOrdersType = new GraphQLObjectType({  
    name: "WoocommerceOrdersType",
    fields: () => ({
      orderId: { type: new GraphQLNonNull(GraphQLID) },
      key: { type: new GraphQLNonNull(GraphQLString) },
      channel: { type: new GraphQLNonNull(GraphQLString) }
    })
  })
  
  module.exports = { WoocommerceOrdersType };
  