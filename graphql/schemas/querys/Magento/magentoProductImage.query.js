const { getImages } = require('../../../../controllers/Magento.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const magentoProductImageListType  = require('../../types/Magento/ProductImages/magentoImageListType');
const ListingInput = require('../../types/pagination/listingInput');

const MagentoProductImageListQuery = {
  type:  magentoProductImageListType,
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
  
module.exports = MagentoProductImageListQuery;
