const { getVariations } = require('../../../../controllers/Magento.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const magentoProductVariationListType  = require('../../types/Magento/ProductVariation/magentoProductVariationListType');
const ListingInput = require('../../types/pagination/listingInput');

const MagentoProductVariationListQuery = {
  type:  magentoProductVariationListType,
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
  
module.exports = MagentoProductVariationListQuery;