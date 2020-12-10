const { getProductId } = require('../../../../controllers/Shopify.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const ShopifyProductIdType  = require('../../types/shopify/ProductId/shopifyProductId.type');
const {
  GraphQLString
} = require('graphql');

const ShopifyProductIdQuery = {
  type:  ShopifyProductIdType,
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
  
module.exports = ShopifyProductIdQuery;