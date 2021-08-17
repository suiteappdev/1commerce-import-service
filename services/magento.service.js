let logger;
const axios = require('axios');

let init = async (app, locals) => {
  logger = locals.logger.getLogger("magentoService");

  return new Promise(async (resolve, reject) => {
    logger.info(`Loading magento service`);
    try {
      locals.services = locals.services || {};
      locals.services.Magento = {
        getTax,
        getAttributes,
        getProducts,
        getVariations,
        getStockItem,
        getMediaItem
      };
      logger.info(`magento service done.`);
      return resolve();
    } catch (e) {
      logger.error(`Error loading  magento Service`);
      reject(new Error(`[ERROR]:loading  magento Service`));
    }
  });
}

let getProducts = (credentials, params) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'get',
      url: `https://${credentials.shopName}/rest/default/V1/products${params ? params : ''}`,
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${credentials.password}`
      }
    };
    let response = await axios(options).catch(e => console.log("ERR", e) && resolve(null));
    if(response && response.data){
      return resolve(response.data);
    }
    resolve(null);
  });
}

let getTax = (credentials, params) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'get',
      url: `https://${credentials.shopName}/rest/default/V1/taxRates/search${params ? params : ''}`,
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${credentials.password}`
      }
    };
    let response = await axios(options).catch(e => console.log("ERR", e) && resolve(null));
    if(response && response.data){
      return resolve(response.data.items);
    }
    resolve(null);
  });
}

let getAttributes = (credentials, attribute) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'get',
      url: `https://${credentials.shopName}/rest/default/V1/products/attributes/${attribute}/options`,
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${credentials.password}`
      }
    };
    let response = await axios(options).catch(e => console.log("ERR", e) && resolve(null));
    if(response && response.data){
      return resolve(response.data);
    }
    resolve(null);
  });
}

let getVariations = (credentials, sku) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'get',
      url: `https://${credentials.shopName}/rest/default/V1/configurable-products/${sku}/children`,
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${credentials.password}`
      }
    };
    let response = await axios(options).catch(e => resolve(null));
    if(response && response.data){
      return resolve(response.data);
    }
    resolve(null);
  });
}

let getStockItem = (credentials, sku) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'get',
      url: `https://${credentials.shopName}/rest/default/V1/stockItems/${sku}`,
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${credentials.password}`
      }
    };
    let response = await axios(options).catch(e => resolve(null));
    if(response && response.data){
      return resolve(response.data);
    }
    resolve(null);
  });
}

let getMediaItem = (credentials, sku) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'get',
      url: `https://${credentials.shopName}/rest/default/V1/products/${sku}/media`,
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${credentials.password}`
      }
    };
    let response = await axios(options).catch(e => console.log("ERR", e) && resolve(null));
    if(response && response.data){
      return resolve(response.data);
    }
    resolve(null);
  });
}

module.exports = { init };
