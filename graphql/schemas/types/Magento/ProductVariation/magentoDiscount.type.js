const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat
} = require('graphql');

let MagentoDiscountType = new GraphQLObjectType({
  name: 'MagentoDiscountType',
  fields: () => ({
    name:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.name
    }},
    from:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.from
    }},
    to:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.to
    }},
    type:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.type
    }},
    value:{ type:GraphQLFloat, resolve:(obj, args, context, info)=>{
      return obj.value
    }}
  }),
});

module.exports = MagentoDiscountType;