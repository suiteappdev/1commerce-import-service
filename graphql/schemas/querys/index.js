const WooCommerceProduct = require('./WooCommerce/wooCommerceProduct.query');
const WooCommerceProductVariation = require('./WooCommerce/wooCommerceProductVariation.query');
const WooCommerceProductImage = require('./WooCommerce/wooCommerceProductImage.query');
const ShopifyProducts = require('./Shopify/shopifyProduct.query.js');

module.exports = {
    public: {
        WooCommerceProduct,
        WooCommerceProductVariation,
        WooCommerceProductImage,
        ShopifyProducts,
    }
}
