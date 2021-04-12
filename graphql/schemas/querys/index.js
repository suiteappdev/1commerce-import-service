const WooCommercePagination = require('./WooCommerce/woocomercePagination.query');
const WooCommerceProduct = require('./WooCommerce/wooCommerceProduct.query');
const WooCommerceProductVariation = require('./WooCommerce/wooCommerceProductVariation.query');
const WooCommerceProductImage = require('./WooCommerce/wooCommerceProductImage.query');
const WooCommerceProductId = require('./WooCommerce/wooCommerceProductId.query');
const WooCommerceOrderId = require('./WooCommerce/woocommerceOrderId.query');

const ShopifyPagination = require('./Shopify/shopifyPagination.query');
const ShopifyProducts = require('./Shopify/shopifyProduct.query.js');
const ShopifyProductVariation = require('./Shopify/shopifyProductVariation.query');
const ShopifyProductImage = require('./Shopify/shopifyProductImage.query');
const ShopifyProductId = require('./Shopify/shopifyProductId.query');
const ShopifyOrderId = require('./Shopify/shopifyOrderId.query');

const VtexPagination = require('./Vtex/vtexPagination.query');
const VtexProducts = require('./Vtex/vtexProduct.query');
const VtexProductVariation = require('./Vtex/vtexProductVariation.query');
const VtexProductImage = require('./Vtex/vtexProductImage.query');
const VtexProductId = require('./Vtex/vtexProductId.query');

const PrestashopProducts = require('./Prestashop/prestashopProduct.query.js');
const PrestashopProductVariation = require('./Prestashop/prestashopProductVariation.query');
const PrestashopProductId = require('./Prestashop/prestashopProductId.query');

module.exports = {
    public: {
        WooCommercePagination,
        WooCommerceProduct,
        WooCommerceProductVariation,
        WooCommerceProductImage,
        WooCommerceProductId,
        WooCommerceOrderId,
        ShopifyPagination,
        ShopifyProducts,
        ShopifyProductVariation,
        ShopifyProductImage,
        ShopifyProductId,
        ShopifyOrderId,
        VtexPagination,
        VtexProducts,
        VtexProductVariation,
        VtexProductImage,
        VtexProductId,
        PrestashopProducts,
        PrestashopProductVariation,
        PrestashopProductId
    }
}
