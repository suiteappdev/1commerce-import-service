const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

let WooCommerceProductIdTaxType = new GraphQLObjectType({
    name: 'WooCommerceProductIdTaxType',
    fields: () => ({
      name:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
        return obj.name;
      }},
      rate:{type:GraphQLInt, resolve :(obj, args, context, info)=>{
        return parseInt(obj.rate);
      }}
    }),
});

module.exports = WooCommerceProductIdTaxType;