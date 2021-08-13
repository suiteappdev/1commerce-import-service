const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

let MagentoTaxType = new GraphQLObjectType({
  name: 'MagentoTaxType',
  fields: () => ({
    name:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.code || '';
    }},
    rate:{type:GraphQLInt, resolve :(obj, args, context, info)=>{
      return obj.rate || 0;
    }}
  }),
});

module.exports = MagentoTaxType;