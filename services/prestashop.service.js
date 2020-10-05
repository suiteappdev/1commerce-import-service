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
                url: `http://superalimentos.store/api/products?display=[id,name,reference,description,description_short,active,price,id_tax_rules_group,manufacturer_name,width,height,depth,weight,id_default_image]`,
                headers: {
                    'Authorization':'Basic QUgzWTE1VVQ3SkxKUUo1MVhDQUxWNlUzNEI0VTU4SjY6',
                    'Io-Format':'JSON'
                },
                auth:{
                    username:'AH3Y15UT7JLJQJ51XCALV6U34B4U58J6'
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

let getTaxes = () => {
        return new Promise(async (resolve, reject) => {
            let response;
            try {
                const options = {
                    method: 'get',
                    url: `http://superalimentos.store/api/taxes?display=[id,rate,name]`,
                    headers: {
                        'Authorization':'Basic QUgzWTE1VVQ3SkxKUUo1MVhDQUxWNlUzNEI0VTU4SjY6',
                        'Io-Format':'JSON'
                    },
                    auth:{
                        username:'AH3Y15UT7JLJQJ51XCALV6U34B4U58J6'
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

let getImages = (id) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: `http://superalimentos.store/api/images/products/${id}`,
                headers: {
                    'Authorization':'Basic QUgzWTE1VVQ3SkxKUUo1MVhDQUxWNlUzNEI0VTU4SjY6'
                },
                auth:{
                    username:'AH3Y15UT7JLJQJ51XCALV6U34B4U58J6'
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