const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

let MercadolibreImageType = new GraphQLObjectType({
  name: 'MercadolibreImageType',
  fields: () => ({
    file: { type: GraphQLString, resolve : (obj, args, context, info)=>{
      return obj.id;
    }},
    src: { type: GraphQLString , resolve : (obj, args, context, info)=>{
      return obj.secure_url;
    }}
  }),
});

module.exports = MercadolibreImageType;
