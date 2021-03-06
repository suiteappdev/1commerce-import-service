const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const ShopifyCustomerType = new GraphQLObjectType({
  name: 'ShopifyCustomerType',
  fields: () => ({
    emailAddress:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.email;
    }},
    emailStatus: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return 'confirmed';
    }},
    fullName: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.first_name + ' ' + obj.last_name;
    }},
    dniType: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return 'CC';
    }},
    dni: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.company;
    }},
    mobile: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.phone;
    }},
    mobileStatus:{type:GraphQLString, resolve :(obj, args, context, info)=>{
      return 'unconfirmed';
    }}
  }),
});

module.exports = ShopifyCustomerType;
