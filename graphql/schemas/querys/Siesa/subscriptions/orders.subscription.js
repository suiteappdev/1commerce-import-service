const { GraphQLObjectType } = require('graphql');
const orderCreated = require('./order-created');
const OrderStatusChanged = require('./order-status-changed');

module.exports = new GraphQLObjectType({
    name: 'RootSubscription',
    description: 'Root Subscription',
    fields: {
      OrderCreated: orderCreated,
      OrderStatusChanged : OrderStatusChanged
    }
});