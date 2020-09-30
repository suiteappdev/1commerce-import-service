const {
  GraphQLString,
} = require('graphql');
const { getImages } = require('../../../../controllers/Shopify.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const shopifyImageListType  = require('../../types/shopify/ProductImages/shopifyImageListType');

const ShopifyProductImageQuery = {
  type:  shopifyImageListType,
  args: { productId: { type: GraphQLString } },
  resolve: (_, { productId }, context) => {
    let token = getToken(context.req);
    let credentials = validate(token);
    delete credentials.iat;
    
    if(!credentials){
      throw new Error("Auth token error");
    }
    context.req = credentials;
    
    return getImages(credentials, productId);
  }
};
  
module.exports = ShopifyProductImageQuery;