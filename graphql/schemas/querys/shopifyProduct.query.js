const {
    GraphQLList
} = require('graphql');

const { getProducts, fetchAll } = require('../../../controllers/Shopify.controller');
const { getToken, validate}  = require('../../../util/auth.util');
const shopifyProductType  = require('../types/shopify/shopifyProduct.type');

let ShopifyProductListQuery = {
    type:  new GraphQLList(shopifyProductType),
    resolve: async (obj, args, { req }, info) => {
        try {
            let token = getToken(req);
            let credentials = validate(token);

            await fetchAll(credentials);

            if(!credentials){
                throw new Error("Auth token error");
            }
            
            req.credentials = credentials;
            
            return getProducts(credentials);

        } catch (error) {
            throw new Error("Auth token error");
        }

    },
};
  
module.exports = ShopifyProductListQuery;