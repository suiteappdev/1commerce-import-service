const { getOrderId } = require('../../../../controllers/Shopify.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const ShopifyOrderIdType  = require('../../types/shopify/OrderId/shopifyOrderId.type');
const {
  GraphQLString
} = require('graphql');

const ShopifyOrderIdQuery = {
  type:  ShopifyOrderIdType,
  args: { orderId: { type: GraphQLString} },
  resolve: (_, { orderId }, context) => {
    let token = getToken(context.req);
    let credentials = validate(token);
    delete credentials.iat;
    if(!credentials){
      throw new Error("Auth token error");
    }
    context.req = credentials;
    
    return getOrderId(credentials, orderId);
  }
};

module.exports = ShopifyOrderIdQuery;
