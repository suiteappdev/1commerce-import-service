const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

let ShopifyProductVariationType = new GraphQLObjectType({
  name: 'ShopifyProductVariationType',
  fields: () => ({
    price:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.price ? parseInt(obj.price == "" ? 0 : obj.price) : 0
    }},
    talla:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.option1;
    }},
    quantity:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.inventory_quantity || 0
    }},
    reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.sku
    }}
  }),
});

module.exports = ShopifyProductVariationType;