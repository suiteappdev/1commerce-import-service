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
                getCount,
                getIdTaxes,
                getTaxes,
                getDiscounts,
                getDiscountNames,
                getImages,
                getCombinations,
                getAttributes,
                getQuantities,
                getProductId,
                getOrderId,
                getCustomer,
                getPayment,
                getStatus,
                getAddress,
                getCountry,
                getState,
                getOptions
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
        let amount=limits.pagination.pageSize;
        let limit=((limits.pagination.page-1)*amount);
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/products?display=full&limit=${limit},${amount}`,
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
let getCount = (credentials, limits) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/products?display=full`,
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

let getDiscounts = (credentials) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/specific_prices?display=[id,id_specific_price_rule,id_product,reduction,reduction_type,from,to]`,
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
            return resolve(response.data.specific_prices);
        }

        resolve(null);
});
}
let getDiscountNames = (credentials) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/specific_price_rules?display=full`,
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
            return resolve(response.data.specific_price_rules);
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

let getCombinations = (credentials,product_id) => {
    return new Promise(async (resolve, reject) => {
        let response;
        
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/combinations/?display=full&&filter[id_product]=${product_id}`,
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

let getQuantities = (credentials) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/stock_availables/?display=[id_product_attribute,quantity]`,
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

let getProductId = (credentials, product_id) => {
    return new Promise(async (resolve, reject) => {
        let response;
        
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/products/?display=full&&filter[id]=${product_id}`,
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
            return resolve(response.data.products[0]);
        }

        resolve(null);
});
}

let getOrderId = (credentials, order_id) => {
    return new Promise(async (resolve, reject) => {
        let response;
        
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/orders/?display=full&&filter[id]=${order_id}`,
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
            return resolve(response.data.orders[0]);
        }

        resolve(null);
});
}

let getCustomer = (credentials, customer_id) => {
    return new Promise(async (resolve, reject) => {
        let response;
        
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/customers/?display=full&&filter[id]=${customer_id}`,
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
            return resolve(response.data.customers[0]);
        }

        resolve(null);
});
}

let getPayment = (credentials, reference) => {
    return new Promise(async (resolve, reject) => {
        let response;
        
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/order_payments/?display=full&&filter[order_reference]=${reference}`,
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
            if(response.data.length==0){
                return resolve(response.data);
            }else{
                return resolve(response.data.order_payments[0]);
            }
        }

        resolve(null);
});
}

let getStatus = (credentials, id) => {
    return new Promise(async (resolve, reject) => {
        let response;
        
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/order_states/?display=full&&filter[id]=${id}`,
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
            return resolve(response.data.order_states[0]);
        }

        resolve(null);
});
}

let getAddress = (credentials, id) => {
    return new Promise(async (resolve, reject) => {
        let response;
        
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/addresses/?display=full&&filter[id]=${id}`,
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
            return resolve(response.data.addresses[0]);
        }

        resolve(null);
});
}

let getCountry = (credentials, id) => {
    return new Promise(async (resolve, reject) => {
        let response;
        
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/countries/?display=full&&filter[id]=${id}`,
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
            return resolve(response.data.countries[0]);
        }

        resolve(null);
});
}

let getState = (credentials, id) => {
    return new Promise(async (resolve, reject) => {
        let response;
        
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/states/?display=full&&filter[id]=${id}`,
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
            return resolve(response.data.states[0]);
        }

        resolve(null);
});
}

let getOptions = (credentials,id) => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            const options = {
                method: 'get',
                url: credentials.url+`/api/product_options/?display=full`,
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
            return resolve(response.data.product_options);
        }

        resolve(null);
    });
}

module.exports = { init };