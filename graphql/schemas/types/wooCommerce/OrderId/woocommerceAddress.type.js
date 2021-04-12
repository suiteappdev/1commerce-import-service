const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const WoocommerceAddressType = new GraphQLObjectType({
  name: 'WocommerceAddressType',
  fields: () => ({
    name:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address1;
    }},
    addressline1: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address_1;
    }},
    addressline2: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address_2;
    }},
    city: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.city.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }},
    notes: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address2;
    }},
    zipcode: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.postcode;
    }}
  }),
});

module.exports = WoocommerceAddressType;
