let WooCommerceProduct = require('./WooCommerce/wooCommerceProduct.query');
const ShopifyProducts = require('./Shopify/shopifyProduct.query.js');

module.exports = {
    public: {
        WooCommerceProduct,
        ShopifyProducts
    }
}
