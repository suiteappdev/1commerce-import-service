const { getOrderId } = require('../../../../controllers/WooCommerce.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const WoocommerceOrderIdType  = require('../../types/wooCommerce/OrderId/woocommerceOrderId.type');
const {
  GraphQLString
} = require('graphql');

const WoocommerceOrderIdQuery = {
  type:  WoocommerceOrderIdType,
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

module.exports = WoocommerceOrderIdQuery;
