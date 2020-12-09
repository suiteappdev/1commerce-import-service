const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLID,
    GraphQLFloat
  } = require('graphql');

const OrderStatusChangedTyPe = new GraphQLObjectType({  
    name: "OrderStatusChangedTyPe",    
    fields: () => ({    
      reference: { type: new GraphQLNonNull(GraphQLID) },        
      status: { type: new GraphQLNonNull(GraphQLString) },  
      statusText : { type: new GraphQLNonNull(GraphQLString)}     
    })
})

module.exports = { OrderStatusChangedTyPe };