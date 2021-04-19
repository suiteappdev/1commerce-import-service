const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const WoocommerceCustomerType = new GraphQLObjectType({
  name: 'WoocommerceCustomerType',
  fields: () => ({
    emailAddress:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.email;
    }},
    emailStatus: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return 'confirmed';
    }},
    fullName: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.customer;
    }},
    dniType: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return 'CC';
    }},
    dni: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.dni || 0;
    }},
    mobilecountry: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.country;
    }},
    mobile: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.phone;
    }},
    mobileStatus:{type:GraphQLString, resolve :(obj, args, context, info)=>{
      return 'unconfirmed';
    }}
  }),
});

module.exports = WoocommerceCustomerType;
