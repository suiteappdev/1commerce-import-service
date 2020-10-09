const WooCommercePagination = require('./WooCommerce/woocomercePagination.query');
const WooCommerceProduct = require('./WooCommerce/wooCommerceProduct.query');
const WooCommerceProductVariation = require('./WooCommerce/wooCommerceProductVariation.query');
const WooCommerceProductImage = require('./WooCommerce/wooCommerceProductImage.query');
const ShopifyPagination = require('./WooCommerce/woocomercePagination.query');
const ShopifyProducts = require('./Shopify/shopifyProduct.query.js');
const ShopifyProductVariation = require('./Shopify/shopifyProductVariation.query');
const ShopifyProductImage = require('./Shopify/shopifyProductImage.query');
const VtexPagination = require('./Vtex/vtexPagination.query');
const VtexProducts = require('./Vtex/vtexProduct.query');
const VtexProductVariation = require('./Vtex/vtexProductVariation.query');
const VtexProductImage = require('./Vtex/vtexProductImage.query');

module.exports = {
    public: {
        WooCommercePagination,
        WooCommerceProduct,
        WooCommerceProductVariation,
        WooCommerceProductImage,
        ShopifyPagination,
        ShopifyProducts,
        ShopifyProductVariation,
        ShopifyProductImage,
        VtexPagination,
        VtexProducts,
        VtexProductVariation,
        VtexProductImage
    }
}
