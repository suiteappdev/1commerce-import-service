const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

let MagentoImageType = new GraphQLObjectType({
  name: 'MagentoImageType',
  fields: () => ({
    file: { type: GraphQLString, resolve : (obj, args, context, info)=>{
      return obj.file;
    }},
    position: { type: GraphQLInt, resolve : (obj, args, context, info)=>{
      return obj.position;
    }},
    src: { type: GraphQLString , resolve : (obj, args, context, info)=>{
      return `https://${context.req.shopName}/pub/media/catalog/product${obj.file}`;
    }}
  }),
});

module.exports = MagentoImageType;
