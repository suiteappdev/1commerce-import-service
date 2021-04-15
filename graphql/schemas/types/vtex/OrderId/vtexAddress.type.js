const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const VtexAddressType = new GraphQLObjectType({
  name: 'VtexAddressType',
  fields: () => ({
    name:{ type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address.street.trim().toLowerCase() + ' ' + obj.address.neighborhood.trim().toLowerCase();
    }},
    addressline1: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address.street.trim().toLowerCase() + ' ' + obj.address.neighborhood.trim().toLowerCase();
    }},
    addressline2: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address.complement.trim().toLowerCase();
    }},
    city: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address.city.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }},
    region: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address.state.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }},
    notes: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address.complement;
    }},
    zipcode: { type:GraphQLString, resolve :(obj, args, context, info)=>{
      return obj.address.postalCode;
    }}
  }),
});

module.exports = VtexAddressType;
