const {
  GraphQLString,
} = require('graphql');
const { getVariations } = require('../../../../controllers/Shopify.controller');
const { getToken, validate}  = require('../../../../util/auth.util');
const ShopifyProductVariationListType  = require('../../types/shopify/ProductVariation/shopifyProductVariationListType');

const ShopifyProductVariationQuery = {
  type:  ShopifyProductVariationListType,
  args: { productId: { type: GraphQLString } },
  resolve: (_, { productId }, context) => {
    let token = getToken(context.req);
    let credentials = validate(token);
    delete credentials.iat;
    
    if(!credentials){
      throw new Error("Auth token error");
    }
    context.req = credentials;
    
    return getVariations(credentials, productId);
  }
};
  
module.exports = ShopifyProductVariationQuery;