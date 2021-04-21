const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
  } = require('graphql');

  const WebHookStatus  = require('./Status.type');
  const TopicType  = require('./Topic.type');
  
  let WoocommerceWebHookType = new GraphQLObjectType({
    name: 'WoocommerceWebHookType',
    fields: () => ({
      name: {type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.name
      }},
      delivery_url: {type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.delivery_url
      }},
      topic: {type: TopicType, resolve: (obj, args, context, info) => {
        return obj.topic
      }},
      status: {type: WebHookStatus, resolve: (obj, args, context, info) => {
        return obj.status
      }},
      version: {type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.version
      }}
    }),
  });
  
  module.exports = WoocommerceWebHookType;