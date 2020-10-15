const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

let ShopifyTaxType = new GraphQLObjectType({
    name: 'ShopifyTaxType',
    fields: () => ({
      name:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
        return obj.tax_name || '';
      }},
      rate:{type:GraphQLInt, resolve :(obj, args, context, info)=>{
        return parseInt(obj.tax * 100) || 0;
      }}
    }),
});

module.exports = ShopifyTaxType;