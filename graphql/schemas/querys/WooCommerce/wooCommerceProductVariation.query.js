const {
  GraphQLString,
} = require('graphql');
const { getVariations } = require('../../../../controllers/WooCommerce.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const WooCommerceProductVariationListType  = require('../../types/wooCommerce/ProductVariations/WooCommerceProductVariationListType');

const WooCommerceProductVariationQuery = {
  type:  WooCommerceProductVariationListType,
  args: { productId: { type: GraphQLString } },
  resolve: (_, { productId }, context) => {
    let token = getToken(context.req);
    let credentials = validate(token);
    delete credentials.iat;
    
    if(!credentials){
      throw new Error("Auth token error");
    }
    context.req = credentials;
    
    return getVariations(credentials, {id : productId});
  }
};
  
module.exports = WooCommerceProductVariationQuery;