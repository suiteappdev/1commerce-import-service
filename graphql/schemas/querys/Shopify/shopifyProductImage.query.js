const { getImages } = require('../../../../controllers/Shopify.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const shopifyProductImageListType  = require('../../types/shopify/ProductImages/shopifyImageListType');
const ListingInput = require('../../types/pagination/listingInput');

const ShopifyProductImageListQuery = {
  type:  shopifyProductImageListType,
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
  
module.exports = ShopifyProductImageListQuery;