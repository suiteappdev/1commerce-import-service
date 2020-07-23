const {
    GraphQLList
} = require('graphql');

const { getProducts } = require('../../../controllers/WooCommerce.controller');
const { getToken, validate}  = require('../../../util/auth.util');
const WooCommerceProductType  = require('../types/wooCommerceProduct.type');

let WooCommerceProductListQuery = {
    type:  new GraphQLList(WooCommerceProductType),
    resolve: (obj, args, { req }, info) => {
        try {
            let token = getToken(req);
            let credentials = validate(token)

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
  
module.exports = WooCommerceProductListQuery;