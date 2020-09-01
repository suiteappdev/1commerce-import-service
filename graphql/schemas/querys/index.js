let WooCommerceProduct = require('./WooCommerce/wooCommerceProduct.query');
const ShopifyProducts = require('./Shopify/ShopifyProduct.query');

module.exports = {
    public: {
        WooCommerceProduct,
        ShopifyProducts
    }
}