const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const WoocommerceItemType = new GraphQLObjectType({
  name: 'WoocommerceItemType',
  fields: () => ({
    skuId:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.sku;
    }},
    quantity:{ type:GraphQLInt, resolve :(obj, args, context, info)=>{
      return obj.quantity;
    }},
  }),
});

module.exports = WoocommerceItemType;
