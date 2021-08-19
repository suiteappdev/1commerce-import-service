const { getProducts } = require('../../../../controllers/Magento.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const MagentoProductListType  = require('../../types/Magento/Product/magentoProductListType');
const ListingInput = require('../../types/pagination/listingInput');

const MagentoProductListQuery = {
  type:  MagentoProductListType,
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

module.exports = MagentoProductListQuery;
