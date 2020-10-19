const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

let VtexProductVariationType = new GraphQLObjectType({
  name: 'VtexProductVariationType',
  fields: () => ({
    price:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.bestPrice || 0;
    }},
    talla:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.dimensions.Talla && obj.dimensions.Talla !== '' ? obj.dimensions.Talla : 'único';
    }},
    quantity:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.availablequantity || 0;
    }},
    reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.skuname ? obj.skuname : '';
    }}
  }),
});

module.exports = VtexProductVariationType;
