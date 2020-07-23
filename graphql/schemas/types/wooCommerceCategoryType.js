const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} = require('graphql');

let WooCommerceCategoryType = new GraphQLObjectType({
    name: 'WooCommerceCategoryType',
    fields: () => ({
      id : { type: GraphQLString},
      name: { type: GraphQLString},
      description : { type: GraphQLString},
      parent : { type: GraphQLInt},
      active : {type: GraphQLBoolean},
      url : {type: GraphQLString},
      level : {type: GraphQLInt},
      createdAt : {type: GraphQLString},
      updateAt : {type: GraphQLString},
      logo : {type: GraphQLString},
      hasChildren : {type: GraphQLBoolean},
      mercadolibre : {type: GraphQLString},
      dafiti : {type: GraphQLString},
      linio : {type: GraphQLString},
      slug: { type: GraphQLString},
    }),
});

module.exports = WooCommerceCategoryType;