const { getProducts } = require('../../../../controllers/Vtex.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const VtexProductListType  = require('../../types/vtex/Product/vtexProductListType');
const ListingInput = require('../../types/pagination/listingInput');

const VtexProductListQuery = {
    type:  VtexProductListType,
    args: { listing: { type: ListingInput } },
    resolve: (_, { listing }, context) => {
        let token = getToken(context.req);
        let credentials = validate(token);
       
        delete credentials.iat;
        
        if(!credentials){
            throw new Error("Auth token error");
        }
        
        context.req = credentials;
        
        return getProducts(credentials, listing);
    }
};
  
module.exports = VtexProductListQuery;