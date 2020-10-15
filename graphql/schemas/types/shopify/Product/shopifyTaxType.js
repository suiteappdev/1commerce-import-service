const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

let ShopifyTaxType = new GraphQLObjectType({
    name: 'ShopifyTaxType',
    fields: () => ({
      name:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
        return obj.name;
      }},
      rate:{type:GraphQLInt, resolve :(obj, args, context, info)=>{
        return parseInt(obj.rate);
      }}
    }),
});

module.exports = ShopifyTaxType;