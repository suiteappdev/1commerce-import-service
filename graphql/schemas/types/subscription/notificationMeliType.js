const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const NotificationMeliType = new GraphQLObjectType({  
  name: "NotificationMeliType",
  fields: () => ({
    resource: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    topic: { type: new GraphQLNonNull(GraphQLString) }
  })
})

module.exports = { NotificationMeliType };
