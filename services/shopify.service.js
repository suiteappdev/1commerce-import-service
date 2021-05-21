let logger;
const axios = require('axios');

let init = async (app, locals) => {
    logger = locals.logger.getLogger("shopifyService");

    return new Promise(async (resolve, reject) => {
        logger.info(`Loading wooCommerce service`);
        try {
            locals.services = locals.services || {};
            locals.services.Shopify = {
                getProducts,
                requestProduct,
                count,
                getData,
                getProductId,
                getOrderId,
                addWebhook,
                deleteWebhook
            };
            logger.info(`shopify service done.`);
            return resolve();
        } catch (e) {
            logger.error(`Error loading  shopify Service`);
            reject(new Error(`[ERROR]:loading  shopify Service`));
        }
    });
}

let getProducts = (credentials, collection, params, includePagination) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
         response = await axios.get(`https://${credentials.apiKey}:${credentials.password}@${credentials.shopName}/admin/api/${credentials.version}/${collection}.json${params ? params : ''}`).catch(e => reject(e))
        } catch (error) {
            console.log(error);
        }
        
        if(includePagination && response.headers['link']){
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

let getData = (credentials, collection, params) => {
    return new Promise(async (resolve) => {
        let response = await axios.get(`https://${credentials.apiKey}:${credentials.password}@${credentials.shopName}/admin/api/${credentials.version}/${collection}.json${params ? params : ''}`).catch(e => resolve(null))
        if(response && response.data){
            return resolve(response.data);
        }

        resolve(null);
    });
}

let getProductId = (credentials, collection, productId, params) => {
    return new Promise(async (resolve, reject) => {
        let response = await axios.get(`https://${credentials.apiKey}:${credentials.password}@${credentials.shopName}/admin/api/${credentials.version}/${collection}/${productId}.json${params ? params : ''}`).catch(e => console.log("ERR", e) && reject(e))
        if(response && response.data){
            return resolve(response.data);
        }

        resolve(null);
    });
}

let getOrderId = (credentials, collection, productId) => {
    return new Promise(async (resolve, reject) => {
        let response = await axios.get(`https://${credentials.apiKey}:${credentials.password}@${credentials.shopName}/admin/api/${credentials.version}/${collection}/${productId}.json`).catch(e => console.log("ERR", e) && reject(e))
        if(response && response.data){
            return resolve(response.data);
        }
        resolve(null);
    });
}

let addWebhook = (credentials, webhook) => {
    return new Promise(async (resolve, reject) => {
        let response = await axios.post(`https://${credentials.apiKey}:${credentials.password}@${credentials.shopName}/admin/api/${credentials.version}/webhooks.json`,{webhook}).catch(e => console.log(e) && resolve(null))
        if(response && response.data){
            return resolve(response.data);
        }
        resolve(null);
    });
}

let deleteWebhook = (credentials, webhookId) => {
    return new Promise(async (resolve, reject) => {
        let response = await axios.delete(`https://${credentials.apiKey}:${credentials.password}@${credentials.shopName}/admin/api/${credentials.version}/webhooks/${webhookId}.json`).catch(e => console.log(e) && resolve(null))
        if(response){
            return resolve('Ok');
        }
        resolve(null);
    });
}

module.exports = { init };