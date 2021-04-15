const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const VtexCustomerType = new GraphQLObjectType({
  name: 'VtexCustomerType',
  fields: () => ({
    emailAddress:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.email;
    }},
    emailStatus: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return 'confirmed';
    }},
    fullName: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.firstName + ' ' + obj.lastName;
    }},
    dniType: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return 'CC';
    }},
    dni: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.document;
    }},
    mobile: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.phone.slice(3);
    }},
    mobileStatus:{type:GraphQLString, resolve :(obj, args, context, info)=>{
      return 'unconfirmed';
    }}
  }),
});

module.exports = VtexCustomerType;
