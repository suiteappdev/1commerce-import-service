const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

let vtexTaxType = new GraphQLObjectType({
  name: 'vtexTaxType',
  fields: () => ({
    name:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.name || '';
    }},
    rate:{type:GraphQLInt, resolve :(obj, args, context, info)=>{
      return obj.tax || 0;
    }}
  }),
});

module.exports = vtexTaxType;