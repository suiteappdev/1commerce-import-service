const { getVariations } = require('../../../../controllers/Shopify.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const shopifyProductVariationListType  = require('../../types/shopify/ProductVariation/shopifyProductVariationListType');
const ListingInput = require('../../types/pagination/listingInput');

const ShopifyProductVariationListQuery = {
  type:  shopifyProductVariationListType,
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
  
module.exports = ShopifyProductVariationListQuery;
