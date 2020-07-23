
let services;
let logger;

let init = (app, locals)=>{
    logger = locals.logger.getLogger("WooCommerceController");

    services = locals.services || {};
    models = locals.models;
    logger.info("Initialization started.");


    locals.controllers = locals.controllers || {}
    
    locals.controllers.WooCommerce = {
        getProducts,
    }

    logger.info("Initialization finished.");

}

let getProducts = (credentials)=>{
    return new Promise(async (resolve, reject)=>{
        try {

         let WooCommerce = new services.WooCommerceRestApi(credentials);
         let products = await WooCommerce.get("products");
         
         return resolve (products.data);
            
        } catch (error) {
            reject(error);
        }
    });
}

let getVariations = (credentials, productId)=>{
    return new Promise(async (resolve, reject)=>{
        try {

         let WooCommerce = new services.WooCommerceRestApi(credentials);
         let products = await WooCommerce.get(`products/${productId}/variations`)

         return resolve (products.data);
            
        } catch (error) {
            reject(error);
        }
    });
}


module.exports = { init, getProducts, getVariations };