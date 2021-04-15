const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const ShopifyItemType = new GraphQLObjectType({
  name: 'ShopifyItemType',
  fields: () => ({
    skuId:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.sku;
    }},
    quantity:{ type:GraphQLInt, resolve :(obj, args, context, info)=>{
      return obj.quantity;
    }},
    price: {type: GraphQLInt, resolve: (obj, args, context, info) => {
      return Math.ceil(obj.price);
    }}
  }),
});

module.exports = ShopifyItemType;
