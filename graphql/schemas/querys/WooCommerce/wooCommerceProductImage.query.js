const { getImages } = require('../../../../controllers/WooCommerce.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const woocommerceProductImageListType  = require('../../types/wooCommerce/ProductImages/woocommerceImageListType');
const ListingInput = require('../../types/pagination/listingInput');

const WoocommerceProductImageListQuery = {
  type:  woocommerceProductImageListType,
  args: { listing: { type: ListingInput } },
  resolve: (_, { listing }, context) => {
    let token = getToken(context.req);
    let credentials = validate(token);
    
    delete credentials.iat;
    
    if(!credentials){
      throw new Error("Auth token error");
    }
    
    context.req = credentials;
    
    return getImages(credentials, listing);
  }
};
  
module.exports = WoocommerceProductImageListQuery;
