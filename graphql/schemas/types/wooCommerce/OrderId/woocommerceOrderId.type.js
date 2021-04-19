const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const WoocommerceCustomerType = require('./woocommerceCustomer.type');
const WoocommerceAddressType = require('./woocommerceAddress.type');
const WoocommerceItemType = require('./woocommerceItem.type');

let WoocommerceOrderIdType = new GraphQLObjectType({
  name: 'WoocommerceOrderIdType',
  fields: () => ({
    channelref: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.number
    }},
    channel: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return 'woocommerce'
    }},
    totalShipping: {type: GraphQLInt, resolve: (obj, args, context, info) => {
      return obj.shipping_lines.length > 0 ? Math.ceil(obj.shipping_lines[0].total) : 0;
    }},
    paymentMethod: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.payment_method
    }},
    paymentId: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.number
    }},
    createdAt: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.date_created
    }},
    status: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return (obj.status == "completed") ? "paid" : "pending";
    }},
    customer: {type: WoocommerceCustomerType, resolve: (obj, args, context, info) => {
      const customer = {}
      
      customer.customer = `${obj.billing.first_name} ${obj.billing.last_name}`;
      customer.phone = obj.billing.phone.trim().replace(/\s+/g, '');
      customer.country = obj.billing.country;
      customer.company = obj.billing.company;
      customer.email =  obj.billing.email;

      return customer;
    }},
    address: {type: WoocommerceAddressType, resolve: (obj, args, context, info) => {
      return obj.billing;
    }},
    items: {type: new GraphQLList(WoocommerceItemType), resolve:(obj, args, context, info)=>{
      return obj.line_items
    }}
  }),
});

module.exports = WoocommerceOrderIdType;