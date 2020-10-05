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
                getTaxes,
                getImages
            };

            logger.info(`Prestashop service done.`);

            return resolve();

        } catch (e) {
            logger.error(`Error loading  prestashop Service`);
            reject(new Error(`[ERROR]:loading  prestashop Service`));
        }
    });

}

let getData = (credentials, collection, params, includePagination) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: credentials.url+'/api/products?display=[id,name,reference,description,description_short,active,price,id_tax_rules_group,manufacturer_name,width,height,depth,weight]&limit=10',
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
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
        if(response && response.data){
            return resolve(response.data);
        }

        resolve(null);
});
}

module.exports = { init };