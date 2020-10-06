const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

let VtexProductVariationType = new GraphQLObjectType({
  name: 'VtexProductVariationType',
  fields: () => ({
    price:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.bestPrice;
    }},
    talla:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.dimensions.Talla;
    }},
    quantity:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.availablequantity;
    }},
    reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.skuname;
    }}
  }),
});

module.exports = VtexProductVariationType;
