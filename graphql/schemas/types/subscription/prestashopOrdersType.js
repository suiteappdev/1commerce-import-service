const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const PrestashopOrdersType = new GraphQLObjectType({  
  name: "PrestashopOrdersType",
  fields: () => ({
    orderId: { type: new GraphQLNonNull(GraphQLID) },
    key: { type: new GraphQLNonNull(GraphQLString) },
    channel: { type: new GraphQLNonNull(GraphQLString) }
  })
})

module.exports = { PrestashopOrdersType };
