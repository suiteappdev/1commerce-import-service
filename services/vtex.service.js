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
                getSku,
                getBrand,
                getEan,
                getQuantity,
                getBenefits,
                getPromotionById,
                getProductIdsColletion,
                getSpecification,
                getOrderId,
                addHookOrder,
                deleteHookOrder
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
                },
                timeout: 60000
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
                },
                timeout: 60000
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
                },
                timeout: 60000
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
                },
                timeout: 60000
            };
            response = await axios(options)
        } catch (error) {
            console.log('No se pudo obtener las variaciones');
        }
        if(response && response.data){
            return resolve(response.data);
        }
        resolve(undefined);
    });
}

let getBrand = (credentials, brandId) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/catalog_system/pvt/brand/${brandId}`,
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                },
                timeout: 60000
            };
            response = await axios(options)
        } catch (error) {
            console.log(error);
        }
        if(response && response.data){
            return resolve(response.data.name);
        }
        resolve('');
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
                },
                timeout: 60000
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

let getEan = (credentials, skuId) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/catalog/pvt/stockkeepingunit/${skuId}/ean`,
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                },
                timeout: 60000
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

let getQuantity = (credentials, skuId) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/logistics/pvt/inventory/skus/${skuId}`,
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                },
                timeout: 60000
            };
            response = await axios(options)
        } catch (error) {
            console.log(error);
        }
        if(response && response.data){
            return resolve(response.data.balance[0]);
        }
        resolve(undefined);
    });
}

let getBenefits = (credentials) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/rnb/pvt/benefits/calculatorconfiguration`,
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                },
                timeout: 60000
            };
            response = await axios(options)
        } catch (error) {
            console.log(error);
        }
        if(response.data && response.data.items.length > 0){
            let result = [];
            response.data.items.map(item => {
                if (item.isActive === true) {
                    result.push(item.idCalculatorConfiguration);
                }
            });
            return resolve(result);
        }
        resolve(undefined);
    });
}

let getPromotionById = (credentials, promotionId) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/rnb/pvt/calculatorconfiguration/${promotionId}`,
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                },
                timeout: 60000
            };
            response = await axios(options)
        } catch (error) {
            console.log(error);
        }
        if(response.data && response.data.collections.length > 0){
            const promotion = response.data
            const result = {
                name: promotion.name,
                beginDateUtc: promotion.beginDateUtc,
                endDateUtc: promotion.endDateUtc,
                percentualDiscountValue: promotion.percentualDiscountValue,
                collectionId: promotion.collections[0].id
            }
            return resolve(result);
        }
        resolve(undefined);
    });
}

let getProductIdsColletion = (credentials, page, collectionId) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/catalog/pvt/collection/${collectionId}/products`,
                params: {page: page, pageSize: 50, Active: 'true', Visible: 'true'},
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                },
                timeout: 60000
            };
            response = await axios(options)
        } catch (error) {
            console.log(error);
        }
        
        if(response && response.data.TotalRows > 0){
            return resolve(response.data);
        }

        resolve(undefined);
    });
}

let getSpecification = (credentials, productId) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/catalog_system/pvt/products/${productId}/specification`,
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                },
                timeout: 60000
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

let getOrderId = (credentials, orderId) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/oms/pvt/orders/${orderId}`,
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                },
                timeout: 60000
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

let addHookOrder = (credentials, webhook) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'post',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/orders/hook/config`,
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                },
                data: {
                    filter: {
                        type: 'FromWorkflow',
                        status: ['order-completed', 'handling', 'ready-for-handling'],
                        disableSingleFire: false
                    },
                    hook: {
                        headers: {key: 'vtexappkey-speedoco-LBCIYP'},
                        url: webhook.url
                    }
                },
                timeout: 60000
            };
            response = await axios(options)
        } catch (error) {
            console.log(error);
        }
        if(response){
            return resolve('Ok');
        }
        resolve(undefined);
    });
}

let deleteHookOrder = (credentials) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'delete',
                url: `https://${credentials.shopName}.vtexcommercestable.com.br/api/orders/hook/config`,
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  'x-vtex-api-appkey': credentials.apiKey,
                  'x-vtex-api-apptoken': credentials.password
                },
                timeout: 60000
            };
            response = await axios(options)
        } catch (error) {
            console.log(error);
        }
        if(response){
            return resolve('Ok');
        }
        resolve(undefined);
    });
}

module.exports = { init };