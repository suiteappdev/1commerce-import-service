const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const PrestashopItemType = new GraphQLObjectType({
  name: 'PrestashopItemType',
  fields: () => ({
    skuId:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.product_attribute_id;
    }},
    quantity:{ type:GraphQLInt, resolve :(obj, args, context, info)=>{
      return obj.product_quantity;
    }},
    price: {type: GraphQLInt, resolve: (obj, args, context, info) => {
      return Math.ceil(obj.unit_price_tax_incl);
    }},
    discount: {type: GraphQLInt, resolve: (obj, args, context, info) => {
      return (Math.ceil(obj.product_price)-Math.ceil(obj.unit_price_tax_excl));
    }}
  }),
});

module.exports = PrestashopItemType;
