const { getProducts } = require('../../../../controllers/Prestashop.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const PrestashopProductListType  = require('../../types/prestashop/Product/prestashopProductListType');
const ListingInput = require('../../types/pagination/listingInput');

const PrestashopProductListQuery = {
    type:  PrestashopProductListType,
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
  
module.exports = PrestashopProductListQuery;