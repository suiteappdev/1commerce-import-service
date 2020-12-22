const { getProductId } = require('../../../../controllers/Prestashop.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const PrestashopProductIdType  = require('../../types/prestashop/ProductId/prestashopProductId.type');
const {
  GraphQLString
} = require('graphql');

const PrestashopProductIdQuery = {
  type:  PrestashopProductIdType,
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
  
module.exports = PrestashopProductIdQuery;