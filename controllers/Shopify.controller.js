
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
        getImages,
        getTax
    }

    logger.info("Initialization finished.");
}

let getPagination = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {
            let totalRecords = await services.Shopify.count({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'count');

            let count = totalRecords ? Math.ceil(totalRecords.count / listing.pagination.pageSize) : null;

            let rs = {
                totalRecords: totalRecords.count || null,
                pagesCount: count,
            }
            return resolve(rs);

        } catch (error) {
            reject(error);
        }
    });
}

let getProducts = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tax = await services.Shopify.getCountry({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'countries', `?fields=name,tax,tax_name`, true);

            let response = await services.Shopify.getData({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'products', `?limit=${listing.pagination.pageSize}${listing.pagination.next ? `&page_info=${listing.pagination.next}` : ''}&fields=id,title,body_html,published_at,variants,vendor,options`, true);

            let totalRecords = await services.Shopify.count({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'count');

            let count = totalRecords ? Math.ceil(totalRecords.count / listing.pagination.pageSize) : null;

            let products = response.products ? response.products.map(p => {
                p.tax = tax.country;
                return p;
            }) : []

            let rs = {
                totalRecords: totalRecords.count || null,
                pagination: response.pagination || null,
                pagesCount: count,
                data: products
            }

            return resolve(rs);

        } catch (error) {
            reject(error);
        }
    });
}

let getVariations = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await services.Shopify.getData({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'products', `?limit=${listing.pagination.pageSize}${listing.pagination.next ? `&page_info=${listing.pagination.next}` : ''}&fields=id,variants,options`, true);

            let totalRecords = await services.Shopify.count({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'count');

            let count = totalRecords ? Math.ceil(totalRecords.count / listing.pagination.pageSize) : null;

            let rs = {
                totalRecords: totalRecords.count || null,
                pagination: response.pagination || null,
                pagesCount: count,
                data: response.products || []
            }
            resolve(rs)
            
        } catch (error) {
            reject(error);
        }
    });
}

let getImages = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await services.Shopify.getData({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'products', `?limit=${listing.pagination.pageSize}${listing.pagination.next ? `&page_info=${listing.pagination.next}` : ''}&fields=id,images`, true);

            let totalRecords = await services.Shopify.count({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'count');

            let count = totalRecords ? Math.ceil(totalRecords.count / listing.pagination.pageSize) : null;

            let rs = {
                totalRecords: totalRecords.count || null,
                pagination: response.pagination || null,
                pagesCount: count,
                data: response.products || []
            }
            resolve(rs)

        } catch (error) {
            reject(error);
        }
    });
}


module.exports = { init, getPagination, getProducts, getVariations, getImages};
