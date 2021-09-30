const { getProducts } = require('../../../../controllers/Mercadolibre.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const MercadolibreProductListType  = require('../../types/Mercadolibre/Product/mercadolibreProductListType');
const ListingInput = require('../../types/pagination/listingInput');

const MercadolibreProductListQuery = {
  type:  MercadolibreProductListType,
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

module.exports = MercadolibreProductListQuery;
