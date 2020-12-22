const { getProductId } = require('../../../../controllers/Vtex.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const VtexProductIdType  = require('../../types/vtex/ProductId/vtexProductId.type');
const {
  GraphQLString
} = require('graphql');

const VtexProductIdQuery = {
  type:  VtexProductIdType,
  args: { productId: { type: GraphQLString} },
  resolve: (_, { productId }, context) => {
    let token = getToken(context.req);
    let credentials = validate(token);
    delete credentials.iat;
    
    if(!credentials){
      throw new Error("Auth token error");
    }
    
    context.req = credentials;
    
    return getProductId(credentials, productId);
  }
};
  
module.exports = VtexProductIdQuery;