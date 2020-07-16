let fs = require('fs');
let logger;
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

let init = async (app, locals)=>{
    logger = locals.logger.getLogger("wooCommerceService");

    return new Promise(async (resolve, reject)=>{
        
        logger.info(`Loading wooCommerce service`);

        try{
            locals.services = locals.services || {};
            locals.services.WooCommerceRestApi = WooCommerceRestApi || {};
            logger.info(`wooCommerce service done.`);

            return resolve();
        
        }catch(e){
            logger.error(`Error loading  wooCommerce Service`);
            reject(new Error(`[ERROR]:loading  wooCommerce Service`));
        }
    });

}

module.exports = { init };