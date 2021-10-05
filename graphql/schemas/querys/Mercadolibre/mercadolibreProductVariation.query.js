const { getVariations } = require('../../../../controllers/Mercadolibre.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const mercadolibreProductVariationListType  = require('../../types/Mercadolibre/ProductVariation/mercadolibreProductVariationListType');
const ListingInput = require('../../types/pagination/listingInput');

const MercadolibreProductVariationListQuery = {
  type:  mercadolibreProductVariationListType,
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
  
module.exports = MercadolibreProductVariationListQuery;