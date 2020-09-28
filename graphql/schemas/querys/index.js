const WooCommerceProduct = require('./WooCommerce/wooCommerceProduct.query');
const WooCommerceProductVariation = require('./WooCommerce/wooCommerceProductVariation.query');
const ShopifyProducts = require('./Shopify/shopifyProduct.query.js');

module.exports = {
    public: {
        WooCommerceProduct,
        WooCommerceProductVariation,
        ShopifyProducts,
    }
}
