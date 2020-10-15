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
                requestProduct,
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

let getData = (credentials, collection, params, includePagination) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
         response = await axios.get(`https://${credentials.apiKey}:${credentials.password}@${credentials.shopName}/admin/api/${credentials.version}/${collection}.json${params ? params : ''}`).catch(e => reject(e))
        } catch (error) {
            console.log(error);
        }
        
        if(includePagination){
            let page_info;
            let next;
    
            if(response.headers['link'].split(',').length === 1){
                next = response.headers['link'].replace('; rel="next"','').replace('<', '').replace('>', '');
            }else{
                next = response.headers['link'].split(',')[1].replace('; rel="next"','').replace('<', '').replace('>', '');
            }
    
            const current_url = new URL(next);
            const search_params = current_url.searchParams;
            page_info = search_params.get('page_info');
    
            response.data.pagination = page_info;
        }
        
        if(response && response.data){
            return resolve(response.data);
        }

        resolve(null);
    });
}

let requestProduct = (credentials, collection, productId, params) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            response = await axios.get(`https://${credentials.apiKey}:${credentials.password}@${credentials.shopName}/admin/api/${credentials.version}/products/${productId}/${collection}.json${params ? params : ''}`).catch(e => reject(e))
        } catch (error) {
            console.log(error);
        }
        
        if(response && response.data){
            return resolve(response.data);
        }

        resolve(null);
    });
}

let count = (credentials, collection) => {
    return new Promise(async (resolve, reject) => {
        let response = await axios.get(`https://${credentials.apiKey}:${credentials.password}@${credentials.shopName}/admin/api/${credentials.version}/products/${collection}.json`).catch(e => console.log("ERR", e) && reject(e))
        if(response && response.data){
            return resolve(response.data);
        }

        resolve(null);
    });
}

module.exports = { init };