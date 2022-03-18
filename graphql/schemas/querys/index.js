const WooCommercePagination = require('./WooCommerce/woocomercePagination.query');
const WooCommerceProduct = require('./WooCommerce/wooCommerceProduct.query');
const WoocommerceProductVariation = require('./WooCommerce/woocommerceProductVariation.query');
const WoocommerceProductImage = require('./WooCommerce/wooCommerceProductImage.query');
const WoocommerceProductId = require('./WooCommerce/woocommerceProductId.query');
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
const VtexOrderId = require('./Vtex/vtexOrderId.query');

const PrestashopProducts = require('./Prestashop/prestashopProduct.query.js');
const PrestashopProductVariation = require('./Prestashop/prestashopProductVariation.query');
const PrestashopProductId = require('./Prestashop/prestashopProductId.query');
const PrestashopOrderId = require('./Prestashop/prestashopOrderId.query');

const MagentoPagination = require('./Magento/magentoPagination.query');
const MagentoProducts = require('./Magento/magentoProduct.query');
const MagentoProductVariation = require('./Magento/magentoProductVariation.query');
const MagentoProductImage = require('./Magento/magentoProductImage.query');

const MercadolibrePagination = require('./Mercadolibre/mercadolibrePagination.query');
const MercadolibreProducts = require('./Mercadolibre/mercadolibreProduct.query');
const MercadolibreProductVariation = require('./Mercadolibre/mercadolibreProductVariation.query');
const MercadolibreProductImage = require('./Mercadolibre/mercadolibreProductImage.query');

module.exports = {
    public: {
        WooCommercePagination,
        WooCommerceProduct,
        WoocommerceProductVariation,
        WoocommerceProductImage,
        WoocommerceProductId,
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
        VtexOrderId,
        PrestashopProducts,
        PrestashopProductVariation,
        PrestashopProductId,
        PrestashopOrderId,
        MagentoPagination,
        MagentoProducts,
        MagentoProductVariation,
        MagentoProductImage,
        MercadolibrePagination,
        MercadolibreProducts,
        MercadolibreProductVariation,
        MercadolibreProductImage
    }
}
