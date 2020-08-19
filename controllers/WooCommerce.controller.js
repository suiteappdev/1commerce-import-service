
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

let getProducts = (credentials) => {
    return new Promise(async (resolve, reject) => {
        try {

            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let products = await WooCommerce.get("products");

            return resolve(products.data);

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

            if (tax && tax.data && tax.data.length > 0) {
                let rs = tax.data.filter((c) => c.name.toLowerCase() === type.toLowerCase());
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
            let products = await WooCommerce.get(`products/${productId}/variations`)

            return resolve(products.data);

        } catch (error) {
            reject(error);
        }
    });
}


module.exports = { init, getProducts, getVariations, getCategories, getTax };