let logger;
const axios = require('axios');

let init = async (app, locals) => {
    logger = locals.logger.getLogger("vtexService");
    return new Promise(async (resolve, reject) => {
        logger.info(`Loading wooCommerce service`);

        try {
            locals.services = locals.services || {};
            locals.services.Vtex = {
                getCategories,
                getProductIds,
                getProduct,
                getVariations,
                getSku
            };

            logger.info(`vtex service done.`);
            return resolve();

        } catch (e) {
            logger.error(`Error loading  vtex Service`);
            reject(new Error(`[ERROR]:loading  vtex Service`));
        }
    });

}

let getCategories = (credentials) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/catalog_system/pub/category/tree/1`,
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                }
            };
            response = await axios(options)
        } catch (error) {
            console.log(error);
        }
        if(response && response.data){
            return resolve(response.data);
        }

        resolve([]);
    });
}

let getProductIds = (credentials, params) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/catalog_system/pvt/products/GetProductAndSkuIds`,
                params: {categoryId: params.categoryId, _from: params.from, _to: params.to},
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                }
            };
            response = await axios(options)
        } catch (error) {
            console.log(error);
        }
        
        if(response && response.data){
            const result = Object.keys(response.data.data).map(function(key) {
              return {productId: key, skus: response.data.data[key]};
            });
            return resolve({data: result, range: response.data.range});
        }

        resolve([]);
    });
}

let getProduct = (credentials, productId) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/catalog/pvt/product/${productId}`,
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                }
            };
            response = await axios(options)
        } catch (error) {
            console.log(error.data);
        }
        
        if(response && response.data){
            return resolve(response.data);
        }

        resolve(undefined);
    });
}

let getVariations = (credentials, productId) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/catalog_system/pub/products/variations/${productId}`,
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                }
            };
            response = await axios(options)
        } catch (error) {
            console.log(error.response.data);
        }
        if(response && response.data){
            return resolve(response.data);
        }
        resolve(undefined);
    });
}

let getSku = (credentials, skuId) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/catalog_system/pvt/sku/stockkeepingunitbyid/${skuId}`,
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                }
            };
            response = await axios(options)
        } catch (error) {
            console.log(error);
        }
        if(response && response.data){
            return resolve(response.data);
        }
        resolve(undefined);
    });
}

module.exports = { init };