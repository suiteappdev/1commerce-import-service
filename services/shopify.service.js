let fs = require('fs');
let logger;
const axios = require('axios');

let init = async (app, locals) => {
    logger = locals.logger.getLogger("shopifyService");

    return new Promise(async (resolve, reject) => {

        logger.info(`Loading wooCommerce service`);

        try {
            locals.services = locals.services || {};


            locals.services.Shopify = {
                getData,
                count
            };

            logger.info(`shopify service done.`);

            return resolve();

        } catch (e) {
            logger.error(`Error loading  shopify Service`);
            reject(new Error(`[ERROR]:loading  shopify Service`));
        }
    });

}

let getData = (credentials, collection, params) => {
    return new Promise(async (resolve, reject) => {
        let response = await axios.get(`https://${credentials.apiKey}:${credentials.password}@${credentials.shopName}/admin/api/${credentials.version}/${collection}.json${params ? params : ''}`).catch(e => reject(e))

        if(response && response.data){
            return resolve(response.data);
        }

        resolve(null);
    });
}

let count = (credentials, collection) => {
    return new Promise(async (resolve, reject) => {
        let response = await axios.get(`https://${credentials.apiKey}:${credentials.password}@${credentials.shopName}/admin/api/${credentials.version}/${collection}/count.json`).catch(e => reject(e))

        resolve(response.data);
    });
}

module.exports = { init };