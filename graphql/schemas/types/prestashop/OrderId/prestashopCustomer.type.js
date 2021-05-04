const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const PrestashopCustomerType = new GraphQLObjectType({
  name: 'PrestashopCustomerType',
  fields: () => ({
    emailAddress:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.email;
    }},
    emailStatus: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return 'confirmed';
    }},
    fullName: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.firstname + ' ' + obj.lastname;
    }},
    dniType: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return 'CC';
    }},
    dni: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.dni;
    }},
    mobile: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.phone;
    }},
    mobileStatus:{type:GraphQLString, resolve :(obj, args, context, info)=>{
      return 'unconfirmed';
    }}
  }),
});

module.exports = PrestashopCustomerType;
