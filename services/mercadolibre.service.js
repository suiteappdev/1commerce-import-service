let logger;
const axios = require('axios');

let init = async (app, locals) => {
  logger = locals.logger.getLogger("mercadolibreService");

  return new Promise(async (resolve, reject) => {
    logger.info(`Loading mercadolibre service`);
    try {
      locals.services = locals.services || {};
      locals.services.Mercadolibre = {
        getProducts,
        getItems,
        getDescription
      };
      logger.info(`mercadolibre service done.`);
      return resolve();
    } catch (e) {
      logger.error(`Error loading  mercadolibre Service`);
      reject(new Error(`[ERROR]:loading  mercadolibre Service`));
    }
  });
}

let getProducts = (credentials, params) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'get',
      url: `https://api.mercadolibre.com/users/${credentials.apiKey}/items/search${params ? params : ''}`,
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

let getItems = (credentials, params) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'get',
      url: `https://api.mercadolibre.com/items${params ? params : ''}`,
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

let getDescription = (credentials, itemId) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'get',
      url: `https://api.mercadolibre.com/items/${itemId}/description`,
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${credentials.password}`
      }
    };
    let response = await axios(options).catch(e => resolve(null));
    if(response && response.data){
      return resolve(response.data.plain_text);
    }
    resolve(null);
  });
}

module.exports = { init };
