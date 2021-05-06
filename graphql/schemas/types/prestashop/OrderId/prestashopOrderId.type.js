const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const PrestashopCustomerType = require('./prestashopCustomer.type');
const PrestashopAddressType = require('./prestashopAddress.type');
const PrestashopItemType = require('./prestashopItem.type');

let PrestashopOrderIdType = new GraphQLObjectType({
  name: 'PrestashopOrderIdType',
  fields: () => ({
    channelref: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.id;
    }},
    channel: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return 'prestashop';
    }},
    totalShipping: {type: GraphQLInt, resolve: (obj, args, context, info) => {
      return obj.total_shipping;
    }},
    paymentMethod: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.payment;
    }},
    paymentId: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.reference;
    }},
    status: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.status.paid==='1'? 'paid' : obj.status.name;
    }},
    createdAt: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.date_add;
    }},
    customer: {type: PrestashopCustomerType, resolve: (obj, args, context, info) => {
      const customer = obj.customer;
      customer.phone = obj.address.phone.trim().replace(/\s+/g, '');
      customer.country = obj.address.country.name.trim();
      customer.company = obj.address.company.trim();
      customer.dni = obj.address.dni.trim().replace(/\s+/g, '');
      return customer;
    }},
    address: {type: PrestashopAddressType, resolve: (obj, args, context, info) => {
      return obj.address;
    }},
    items: {type: new GraphQLList(PrestashopItemType), resolve:(obj, args, context, info)=>{
      return obj.associations.order_rows;
    }}
  }),
});

module.exports = PrestashopOrderIdType;