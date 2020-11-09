
let services;
let logger;

let init = (app, locals) => {
    logger = locals.logger.getLogger("WooCommerceController");

    services = locals.services || {};
    models = locals.models;
    logger.info("Initialization started.");


    locals.controllers = locals.controllers || {}

    locals.controllers.WooCommerce = {
        getProducts,
        getVariations,
        getImages,
        getPagination
    }

    logger.info("Initialization finished.");
}

let getPagination = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {
            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let response = await WooCommerce.get("products", { per_page: listing.pagination.pageSize, page: listing.pagination.page });
            resolve({
                totalRecords : (response.headers['x-wp-total']),
                pagesCount : parseInt(response.headers['x-wp-totalpages'])
            });

        } catch (error) {
            reject(error);
        }
    });
}

let getProducts = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {
            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let response = await WooCommerce.get("products", { per_page: listing.pagination.pageSize, page: listing.pagination.page });
            let tax = await WooCommerce.get("taxes");
            
            let findTax = (taxClass, taxes)=>{
                return tax.data.filter((c) => c.name.toLowerCase() === taxClass.toLowerCase());
            }

            let results = response.data.map((p)=>{
                let tx = findTax(p.tax_class, tax);

                if(!tx || tx.length == 0){
                    p.tax = tax.data.filter(t=>t.class === 'standard')[0]
                }

                return p;
            });

            resolve({
                totalRecords : (response.headers['x-wp-total']),
                pagesCount : parseInt(response.headers['x-wp-totalpages']),
                data : results || []
            });

        } catch (error) {
            reject(error);
        }
    });
}

let getVariations = (credentials, pro) => {
    return new Promise(async (resolve, reject) => {
        try {

            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let products = await WooCommerce.get(`products/${pro.id}/variations`);

            if (products && products.data) {
                return resolve(products.data);
            }

            resolve([])

        } catch (error) {
            reject(error);
        }
    });
}

let getImages = (credentials, productId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let product = await WooCommerce.get(`products/${productId}`);
            if (product && product.data.images) {
                return resolve({data: product.data.images});
            }

            resolve({data: []})

        } catch (error) {
            reject(error);
        }
    });
}


module.exports = { init, getPagination, getProducts, getVariations, getImages };