const {
    GraphQLInputObjectType,
    GraphQLString,
  } = require('graphql');

  const WebHookInputType = new GraphQLInputObjectType({
        name: 'WebHookInputType',
        fields: {
            name: { type: GraphQLString },
            delivery_url: { type: GraphQLString },
            topic :{ type: GraphQLString },
            status :{ type: GraphQLString },
            version :{ type: GraphQLString }
        },
  });
  
  module.exports = WebHookInputType;