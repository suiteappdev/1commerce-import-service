
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
        getCategories,
        getTax
    }

    logger.info("Initialization finished.");

}

let getProducts = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {
            let list = [];
            let products = [];
            //let categories = await WooCommerce.get(`products/categories`).catch((e)=>console.log(e));

            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let response = await WooCommerce.get("products", { per_page: listing.pagination.pageSize, page: listing.pagination.page });

            resolve({
                totalRecords : (response.headers['x-wp-total']),
                pagesCount : parseInt(response.headers['x-wp-totalpages']),
                data : response.data || []
            });

        } catch (error) {
            reject(error);
        }
    });
}

let getTax = (type, credentials) => {
    return new Promise(async (resolve, reject) => {
        try {

            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let tax = await WooCommerce.get("taxes");

            if (tax.data && tax.data.length > 0) {
                let rs = tax.data.filter((c) => c.name.toLowerCase() === type.toLowerCase());

                if(!rs || rs.length === 0){
                    return resolve(tax.data.filter(t=>t.class === 'standard')[0]);
                }

                return resolve(rs.length > 0 ? rs[0] : null);
            }

            resolve(null);

        } catch (error) {
            reject(error);
        }
    });
}

let getCategories = (credentials) => {
    return new Promise(async (resolve, reject) => {
        try {

            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let categories = await WooCommerce.get(`products/categories`)

            return resolve(categories.data);

        } catch (error) {
            reject(error);
        }
    });
}

let getVariations = (credentials, productId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let products = await WooCommerce.get(`products/${productId}/variations`);

            if (products && products.data) {
                return resolve(products.data);
            }

            resolve([])

        } catch (error) {
            reject(error);
        }
    });
}


module.exports = { init, getProducts, getVariations, getCategories, getTax };