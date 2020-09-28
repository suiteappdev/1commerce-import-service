const {
  GraphQLString,
} = require('graphql');
const { getImages } = require('../../../../controllers/WooCommerce.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const WooCommerceProductImageListType  = require('../../types/wooCommerce/ProductImages/WooCommerceProductImageListType');

const WooCommerceProductImageQuery = {
  type:  WooCommerceProductImageListType,
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
  
module.exports = WooCommerceProductImageQuery;