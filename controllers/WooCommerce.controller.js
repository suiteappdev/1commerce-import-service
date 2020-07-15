
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

let getProducts = ()=>{
    return new Promise(async (resolve, reject)=>{
        try {
         let products = await services.wooCommerce.get("products");
         
         return resolve (products.data);
            
        } catch (error) {
            reject(error);
        }
        
    });
}


module.exports = { init, getProducts };