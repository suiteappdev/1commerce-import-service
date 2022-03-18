const { getProducts } = require('../../../../controllers/WooCommerce.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const WooCommerceProductListType  = require('../../types/wooCommerce/Product/wooCommerceProductListType');
const ListingInput = require('../../types/pagination/listingInput');

const WooCommerceProductListQuery = {
    type:  WooCommerceProductListType,
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
  
module.exports = WooCommerceProductListQuery;
