const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

let VtexWebHookType = new GraphQLObjectType({
  name: 'VtexWebHookType',
  fields: () => ({
    id: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.id ? obj.id : ''
    }}
  }),
});

module.exports = VtexWebHookType;