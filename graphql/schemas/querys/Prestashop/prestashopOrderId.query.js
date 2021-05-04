const { getOrderId } = require('../../../../controllers/Prestashop.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const PrestashopOrderIdType  = require('../../types/prestashop/OrderId/prestashopOrderId.type');
const {
  GraphQLString
} = require('graphql');

const PrestashopOrderIdQuery = {
  type:  PrestashopOrderIdType,
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

module.exports = PrestashopOrderIdQuery;
