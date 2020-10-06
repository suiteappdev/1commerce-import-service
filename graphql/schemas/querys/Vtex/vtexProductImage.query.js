const { getImages } = require('../../../../controllers/Vtex.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const vtexProductImageListType  = require('../../types/vtex/ProductImages/vtexProductImageListType');
const ListingInput = require('../../types/pagination/listingInput');

const VtexProductImageListQuery = {
    type:  vtexProductImageListType,
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
  
module.exports = VtexProductImageListQuery;