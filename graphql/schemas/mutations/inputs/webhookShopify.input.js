const {
  GraphQLInputObjectType,
  GraphQLString,
} = require('graphql');

const WebHookShopifyInputType = new GraphQLInputObjectType({
  name: 'WebHookShopifyInputType',
  fields: {
    topic :{ type: GraphQLString },
    address: { type: GraphQLString },
    format: { type: GraphQLString }
  },
});

module.exports = WebHookShopifyInputType;