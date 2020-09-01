const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} = require('graphql');

let ShopifyCategoryType = new GraphQLObjectType({
    name: 'ShopifyCategoryType',
    fields: () => ({
      id : { type: GraphQLString},
      name: { type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.handle || obj.title
      }},
      description : { type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.title
      }},
      parent : { type: GraphQLInt},
      active : {type: GraphQLBoolean},
      url : {type: GraphQLString},
      product_id : {type: GraphQLString},
      level : {type: GraphQLInt},
      createdAt : {type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.published_at
      }},
      updateAt : {type: GraphQLString,  resolve: (obj, args, context, info) => {
        return obj.updated_at
      }},
      logo : {type: GraphQLString},
      hasChildren : {type: GraphQLBoolean},
      mercadolibre : {type: GraphQLString},
      dafiti : {type: GraphQLString},
      linio : {type: GraphQLString},
      slug: { type: GraphQLString},
    }),
});

module.exports = ShopifyCategoryType;