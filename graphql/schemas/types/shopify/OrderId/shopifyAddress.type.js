const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const ShopifyAddressType = new GraphQLObjectType({
  name: 'ShopifyAddressType',
  fields: () => ({
    name:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address1;
    }},
    addressline1: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address1;
    }},
    addressline2: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address2;
    }},
    city: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.city.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }},
    region: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.province.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }},
    notes: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address2;
    }},
    zipcode: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.zip;
    }}
  }),
});

module.exports = ShopifyAddressType;
