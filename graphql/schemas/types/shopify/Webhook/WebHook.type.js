const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

let ShopifyWebHookType = new GraphQLObjectType({
  name: 'ShopifyWebHookType',
  fields: () => ({
    id: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.id ? obj.id : ''
    }},
    address: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.address ? obj.address : ''
    }},
    topic: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.topic ? obj.topic : ''
    }},
    version: {type: GraphQLString, resolve: (obj, args, context, info) => { 
      return obj.api_version ? obj.api_version : ''
    }}
  }),
});

module.exports = ShopifyWebHookType;