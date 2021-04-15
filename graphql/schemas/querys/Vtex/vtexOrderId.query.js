const { getOrderId } = require('../../../../controllers/Vtex.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const VtexOrderIdType  = require('../../types/vtex/OrderId/vtexOrderId.type');
const {
  GraphQLString
} = require('graphql');

const VtexOrderIdQuery = {
  type:  VtexOrderIdType,
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

module.exports = VtexOrderIdQuery;