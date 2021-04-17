const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const VtexItemType = new GraphQLObjectType({
  name: 'VtexItemType',
  fields: () => ({
    skuId:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.id;
    }},
    quantity:{ type:GraphQLInt, resolve :(obj, args, context, info)=>{
      return obj.quantity;
    }},
    price: {type: GraphQLInt, resolve: (obj, args, context, info) => {
      return Math.ceil(obj.price / 100);
    }},
    discount: {type: GraphQLInt, resolve: (obj, args, context, info) => {
      return Math.ceil(obj.price / 100) - Math.ceil(obj.sellingPrice / 100);
    }}
  }),
});

module.exports = VtexItemType;
