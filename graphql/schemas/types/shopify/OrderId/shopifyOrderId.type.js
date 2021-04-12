const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const ShopifyCustomerType = require('./shopifyCustomer.type');
const ShopifyAddressType = require('./shopifyAddress.type');
const ShopifyItemType = require('./shopifyItem.type');

let ShopifyOrderIdType = new GraphQLObjectType({
  name: 'ShopifyOrderIdType',
  fields: () => ({
    channelref: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.id
    }},
    channel: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return 'shopify'
    }},
    totalOrder: {type: GraphQLInt, resolve: (obj, args, context, info) => {
      return Math.ceil(obj.current_total_price);
    }},
    paymentMethod: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.gateway
    }},
    paymentId: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.number
    }},
    status: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.financial_status
    }},
    createdAt: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.created_at
    }},
    customer: {type: ShopifyCustomerType, resolve: (obj, args, context, info) => {
      const customer = obj.customer;
      customer.phone = obj.billing_address.phone.trim().replace(/\s+/g, '');
      customer.country = obj.billing_address.country;
      customer.company = obj.billing_address.company;
      return customer;
    }},
    address: {type: ShopifyAddressType, resolve: (obj, args, context, info) => {
      return obj.shipping_address;
    }},
    items: {type: new GraphQLList(ShopifyItemType), resolve:(obj, args, context, info)=>{
      return obj.line_items
    }}
  }),
});

module.exports = ShopifyOrderIdType;