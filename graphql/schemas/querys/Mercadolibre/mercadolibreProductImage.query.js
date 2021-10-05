const { getImages } = require('../../../../controllers/Mercadolibre.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const mercadolibreProductImageListType  = require('../../types/Mercadolibre/ProductImages/mercadolibreImageListType');
const ListingInput = require('../../types/pagination/listingInput');

const MercadolibreProductImageListQuery = {
  type:  mercadolibreProductImageListType,
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
  
module.exports = MercadolibreProductImageListQuery;
