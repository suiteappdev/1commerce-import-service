const { getVariations } = require('../../../../controllers/Vtex.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const vtexProductVariationListType  = require('../../types/vtex/ProductVariations/vtexProductVariationListType');
const ListingInput = require('../../types/pagination/listingInput');

const VtexProductVariationListQuery = {
    type:  vtexProductVariationListType,
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
  
module.exports = VtexProductVariationListQuery;