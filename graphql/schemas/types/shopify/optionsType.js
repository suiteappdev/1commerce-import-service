const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} = require('graphql');

let OptionsType = new GraphQLObjectType({
    name: 'ShopifyCategoryType',
    fields: () => ({
      id : { type: GraphQLString},
      name: { type: GraphQLString},
      position : { type: GraphQLInt},
      values :  { type: GraphQLString}
    }),
});

module.exports = OptionsType;