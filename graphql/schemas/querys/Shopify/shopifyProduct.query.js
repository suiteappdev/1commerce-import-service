const { getProducts } = require('../../../../controllers/Shopify.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const ShopifyProductListType  = require('../../types/shopify/Product/shopifyProductListType');
const ListingInput = require('../../types/pagination/listingInput');

const ShopifyProductListQuery = {
    type:  ShopifyProductListType,
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
  
module.exports = ShopifyProductListQuery;