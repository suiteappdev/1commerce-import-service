const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const VtexCustomerType = require('./vtexCustomer.type');
const VtexAddressType = require('./vtexAddress.type');
const VtexItemType = require('./vtexItem.type');

let VtexOrderIdType = new GraphQLObjectType({
  name: 'VtexOrderIdType',
  fields: () => ({
    channelref: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.orderId
    }},
    channel: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return 'vtex'
    }},
    totalShipping: {type: GraphQLInt, resolve: (obj, args, context, info) => {
      return obj.totals.length > 0 ? Math.ceil(obj.totals[2].value / 100) : 0;
    }},
    paymentMethod: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.paymentData.transactions[0].payments[0].paymentSystemName
    }},
    paymentId: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.sequence
    }},
    status: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.status
    }},
    createdAt: {type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.creationDate
    }},
    customer: {type: VtexCustomerType, resolve: (obj, args, context, info) => {
      return obj.clientProfileData;
    }},
    address: {type: VtexAddressType, resolve: (obj, args, context, info) => {
      return obj.shippingData;
    }},
    items: {type: new GraphQLList(VtexItemType), resolve:(obj, args, context, info)=>{
      return obj.items
    }}
  }),
});

module.exports = VtexOrderIdType;