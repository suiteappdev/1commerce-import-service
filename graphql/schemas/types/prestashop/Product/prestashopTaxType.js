const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

let PrestashopTaxType = new GraphQLObjectType({
    name: 'PrestashopTaxType',
    fields: () => ({
      name:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
        console.log(obj);
        return obj.name;
      }},
      rate:{type:GraphQLInt, resolve :(obj, args, context, info)=>{
        return parseInt(obj.rate);
      }}
    }),
});

module.exports = PrestashopTaxType;