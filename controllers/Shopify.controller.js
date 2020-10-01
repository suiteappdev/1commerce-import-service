
let services;
let logger;

let init = (app, locals) => {
    logger = locals.logger.getLogger("ShopifyController");

    services = locals.services || {};
    models = locals.models;
    logger.info("Initialization started.");

    locals.controllers = locals.controllers || {}
    locals.controllers.Shopify = {
        getProducts,
        getVariations,
        getImages
    }

    logger.info("Initialization finished.");
}

let getProducts = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await services.Shopify.getData({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'products', `?limit=${listing.pagination.pageSize}${listing.pagination.next ? `&page_info=${listing.pagination.next}` : ''}&fields=id,title,body_html,published_at,variants,vendor,images,options`, true);
            
            let rs = {
                totalRecords :null,
                pagination : response.pagination  || null,
                pagesCount : null ,
                data : response.products || []
            }

            return resolve(rs);

        } catch (error) {
            reject(error);
        }
    });
}

let getVariations = (credentials, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await services.Shopify.requestProduct({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'variants', productId, `?fields=id,price,sku,inventory_quantity,option1`);
            let rs = {
                data: response.variants || []
            }
            resolve(rs)
            
        } catch (error) {
            reject(error);
        }
    });
}

let getImages = (credentials, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await services.Shopify.requestProduct({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'images', productId, `?fields=id,src,position`);
            let rs = {
                data: response.images || []
            }
            resolve(rs)

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { init, getProducts, getVariations, getImages};
