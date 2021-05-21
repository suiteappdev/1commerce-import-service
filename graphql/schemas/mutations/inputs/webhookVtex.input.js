const {
  GraphQLInputObjectType,
  GraphQLString,
} = require('graphql');

const WebHookVtexInputType = new GraphQLInputObjectType({
  name: 'WebHookVtexInputType',
  fields: {
    url: { type: GraphQLString }
  },
});

module.exports = WebHookVtexInputType;