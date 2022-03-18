const { getVariations } = require('../../../../controllers/WooCommerce.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const woocommerceProductVariationListType  = require('../../types/wooCommerce/ProductVariations/woocommerceProductVariationListType');
const ListingInput = require('../../types/pagination/listingInput');

const WoocommerceProductVariationListQuery = {
  type:  woocommerceProductVariationListType,
  args: { listing: { type: ListingInput } },
  resolve: (_, { listing }, context) => {
    let token = getToken(context.req);
    let credentials = validate(token);
    delete credentials.iat;
    
    if(!credentials){
      throw new Error("Auth token error");
    }
    
    context.req = credentials;
    return getVariations(credentials, listing);
  }
};
  
module.exports = WoocommerceProductVariationListQuery;
