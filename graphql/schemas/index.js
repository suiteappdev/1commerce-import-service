const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { public } = require('./querys/index');
const { Mutation } = require('./querys/Siesa/mutations/create-order.mutation');
const rootSubscription  = require('./querys/Siesa/subscriptions/orders.subscription');

const PublicRootQuery = new GraphQLObjectType({
    name: 'PublicQuery',
    fields:public,
});

module.exports = {
    publicGraph: new GraphQLSchema({
      query: PublicRootQuery,
      mutation : Mutation,
      subscription : rootSubscription
    })
};
  