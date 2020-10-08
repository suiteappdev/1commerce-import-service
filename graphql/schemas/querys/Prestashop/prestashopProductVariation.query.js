const {
    GraphQLString,
    GraphQLInt
  } = require('graphql');
  const { getVariations } = require('../../../../controllers/Prestashop.controller');
  const { getToken, validate}  = require('../../../../util/auth.util');
  const PrestashopProductVariationListType  = require('../../types/prestashop/ProductVariation/prestashopProductVariationListType');

  const PrestashopProductVariationQuery = {
    type:  PrestashopProductVariationListType,
    args: { productId: { type: GraphQLInt } },
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
    
  module.exports = PrestashopProductVariationQuery;