const { getPagination } = require('../../../../controllers/Shopify.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const pagination  = require('../../types/pagination/pagination.type');
const ListingInput = require('../../types/pagination/listingInput');

const ShopifyPaginationQuery = {
    type:  pagination,
    args: { listing: { type: ListingInput } },
    resolve: (_, { listing }, context) => {
      let token = getToken(context.req);
      let credentials = validate(token);
      
      delete credentials.iat;
      
      if(!credentials){
        throw new Error("Auth token error");
      }
      context.req = credentials;
      
      return getPagination(credentials, listing);
    }
};
  
module.exports = ShopifyPaginationQuery;