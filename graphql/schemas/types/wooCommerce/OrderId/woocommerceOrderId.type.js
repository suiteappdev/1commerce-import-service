const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const WoocommerceCustomerType = require('./woocommerceCustomer.type');
const WoocommerceAddressType = require('./woocommerceAddress.type');

let WoocommerceOrderIdType = new GraphQLObjectType({
  name: 'WoocommerceOrderIdType',
  fields: () => ({
    channelref: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.id
    }},
    channel: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return 'woocommerce'
    }},
    totalOrder: {type: GraphQLInt, resolve: (obj, args, context, info) => {
      return Math.ceil(obj.total);
    }},
    paymentMethod: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.payment_method_title
    }},
    paymentId: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.transaction_id
    }},
    customer: {type: WoocommerceCustomerType, resolve: (obj, args, context, info) => {
      const customer = `${obj.billing.first_name} ${obj.billing.last_name}`;
      customer.phone = obj.billing.phone.trim().replace(/\s+/g, '');
      customer.country = obj.billing.country;
      customer.company = obj.billing.company;

      return customer;
    }},
    address: {type: WoocommerceAddressType, resolve: (obj, args, context, info) => {
      return obj.shipping;
    }},
    items: {type: new GraphQLList(GraphQLString), resolve:(obj, args, context, info)=>{
      return obj.line_items.map(p=>p.product_id);
    }}
  }),
});

module.exports = WoocommerceOrderIdType;