const { getProductId } = require('../../../../controllers/WooCommerce.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const WoocommerceProductIdType  = require('../../types/wooCommerce/ProductId/woocommerceProductIdListType');
const {
  GraphQLString
} = require('graphql');

const WoocommerceProductIdQuery = {
  type:  WoocommerceProductIdType,
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
  
module.exports = WoocommerceProductIdQuery;
