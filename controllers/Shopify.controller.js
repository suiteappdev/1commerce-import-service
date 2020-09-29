
let services;
let logger;

let init = (app, locals) => {
    logger = locals.logger.getLogger("ShopifyController");

    services = locals.services || {};
    models = locals.models;
    logger.info("Initialization started.");

    locals.controllers = locals.controllers || {}
    locals.controllers.Shopify = {
        getProducts
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
            }, 'products', `?limit=${listing.pagination.pageSize}${listing.pagination.next ? `&page_info=${listing.pagination.next}` : ''}&fields=id,title,body_html,published_at,variants,vendor`, true);
            
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

module.exports = { init, getProducts};
