const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

let ShopifyDeleteWebHookType = new GraphQLObjectType({
  name: 'ShopifyDeleteWebHookType',
  fields: () => ({
    id: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.id ? obj.id : ''
    }}
  }),
});

module.exports = ShopifyDeleteWebHookType;