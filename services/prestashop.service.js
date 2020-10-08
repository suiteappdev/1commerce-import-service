let fs = require('fs');
let logger;
const axios = require('axios');

let init = async (app, locals) => {
    logger = locals.logger.getLogger("prestashopService");

    return new Promise(async (resolve, reject) => {

        logger.info(`Loading Prestashop service`);

        try {
            locals.services = locals.services || {};


            locals.services.Prestashop = {
                getData,
                getIdTaxes,
                getTaxes,
                getImages,
                getCombinations,
                getAttributes,
                getQuantities
            };

            logger.info(`Prestashop service done.`);

            return resolve();

        } catch (e) {
            logger.error(`Error loading  prestashop Service`);
            reject(new Error(`[ERROR]:loading  prestashop Service`));
        }
    });

}

let getData = (credentials, limits) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/products?display=full&limit=${limits.pagination.page},${limits.pagination.pageSize}`,
                headers: {
                    'Io-Format':'JSON'
                },
                auth:{
                    username:credentials.apiKey
                }
            };
            response = await axios(options).catch(e => reject(e));
        } catch (error) {
            console.log(error);
        }
                
        if(response && response.data){
            return resolve(response.data);
        }

        resolve(null);
    });
}

let getTaxes = (credentials) => {
        return new Promise(async (resolve, reject) => {
            let response;
            try {
                const options = {
                    method: 'get',
                    url: credentials.url+`/api/taxes?display=[id,rate,name]`,
                    headers: {
                        'Io-Format':'JSON'
                    },
                    auth:{
                        username:credentials.apiKey
                    }
                };
                response = await axios(options).catch(e => reject(e));
            } catch (error) {
                console.log(error);
            }
            if(response && response.data){
                return resolve(response.data);
            }
    
            resolve(null);
    });
}

let getIdTaxes = (credentials) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/tax_rules?display=full`,
                headers: {
                    'Io-Format':'JSON'
                },
                auth:{
                    username:credentials.apiKey
                }
            };
            response = await axios(options).catch(e => reject(e));
        } catch (error) {
            console.log(error);
        }
        if(response && response.data){
            return resolve(response.data.tax_rules);
        }

        resolve(null);
});
}

let getImages = (credentials,id) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/images/products/${id}`,
                auth:{
                    username:credentials.apiKey
                }
            };
            response = await axios(options).catch(e => reject(e));
            
        } catch (error) {
            console.log(error);
        }
        if(response && response.data){
            return resolve(response.data);
        }

        resolve(null);
});
}

let getCombinations = (credentials,id) => {
    return new Promise(async (resolve, reject) => {
        let response;
        
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/combinations/?display=full&filter[id_product]=${id}`,
                headers: {
                    'Io-Format':'JSON'
                },
                auth:{
                    username:credentials.apiKey
                }
            };
            response = await axios(options).catch(e => reject(e));

        } catch (error) {
            console.log(error);
        }
        if(response && response.data){
            
            return resolve(response.data.combinations);
        }

        resolve(null);
});
}

let getAttributes = (credentials,id) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/product_option_values/?display=full`,
                headers: {
                    'Io-Format':'JSON'
                },
                auth:{
                    username:credentials.apiKey
                }
            };
            response = await axios(options).catch(e => reject(e));
        } catch (error) {
            console.log(error);
        }
        if(response && response.data){
            return resolve(response.data);
        }

        resolve(null);
});
}

let getQuantities = (credentials,id) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/stock_availables/?filter[id_product]=${id}&display=[id_product_attribute,quantity]`,
                headers: {
                    'Io-Format':'JSON'
                },
                auth:{
                    username:credentials.apiKey
                }
            };
            response = await axios(options).catch(e => reject(e));
           
        } catch (error) {
            console.log(error);
        }
        if(response && response.data){
            return resolve(response.data.stock_availables);
        }

        resolve(null);
});
}

module.exports = { init };