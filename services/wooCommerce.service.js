let fs = require('fs');
let logger;
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

let init = async (app, locals)=>{
    logger = locals.logger.getLogger("wooCommerceService");

    return new Promise(async (resolve, reject)=>{
        
        logger.info(`Loading wooCommerce service`);

        let WooCommerce = new WooCommerceRestApi({
            url: "http://localhost",
            consumerKey: "ck_20ccc436daf55cdadcaa7e933bf3a9728f6a9833",
            consumerSecret: "cs_60b38991a13e32f1b41d32a097b29ec22f6dce58",
            version: "wc/v3"
        });

        logger.info(`wooCommerce service done.`);

        if(WooCommerce){
            try{
                locals.services = locals.services || {};
                locals.services.wooCommerce = WooCommerce|| {};
                return resolve();
            
            }catch(e){
                logger.error(`Error loading  wooCommerce Service`);
                reject(new Error(`[ERROR]:loading  wooCommerce Service`));
            }
        }
    });

}

module.exports = { init };