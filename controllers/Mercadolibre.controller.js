let services;
let logger;

let init = (app, locals) => {
  logger = locals.logger.getLogger("MercadolibreController");

  services = locals.services || {};
  models = locals.models;
  logger.info("Initialization started.");

  locals.controllers = locals.controllers || {}
  locals.controllers.mercadolibre = {
    getPagination,
    getProducts,
    getVariations,
    getImages
  }

  logger.info("Initialization finished.");
}

let getPagination = (credentials, listing) => {
  return new Promise(async (resolve, reject) => {
    try {
      let totalRecords = await services.Mercadolibre.getProducts({
        apiKey: credentials.apiKey,
        password: credentials.password
      }, `?status=active&offset=0&limit=${listing.pagination.pageSize}`);
      let count = totalRecords ? Math.ceil(totalRecords.paging.total / listing.pagination.pageSize) : null;
      let rs = {
        totalRecords: totalRecords.paging.total || null,
        pagesCount: count
      }
      return resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
}

let getProducts = (credentials, listing) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = []
      let offset = (listing.pagination.page - 1) * listing.pagination.pageSize;
      let response = await services.Mercadolibre.getProducts({
        apiKey: credentials.apiKey,
        password: credentials.password
      }, `?status=active&offset=${offset}&limit=${listing.pagination.pageSize}`);
      if (response.results.length > 0) {
        let items = await services.Mercadolibre.getItems({
          apiKey: credentials.apiKey,
          password: credentials.password
        }, `?ids=${response.results.join(',')}&attributes=id,title,status,attributes`);
        for (const item of items) {
          if (item.code === 200) {
            let description = await services.Mercadolibre.getDescription({
              apiKey: credentials.apiKey,
              password: credentials.password
            }, item.body.id);
            products.push({
              ...item.body,
              description
            })
          }
        }
      }
      let count = response ? Math.ceil(response.paging.total / listing.pagination.pageSize) : null;
      let rs = {
        totalRecords: response.paging.total || null,
        pagesCount: count,
        data: products
      }
      return resolve(rs);

    } catch (error) {
      reject(error);
    }
  });
}

let getVariations = (credentials, listing) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = []
      let offset = (listing.pagination.page - 1) * listing.pagination.pageSize;
      let response = await services.Mercadolibre.getProducts({
        apiKey: credentials.apiKey,
        password: credentials.password
      }, `?status=active&offset=${offset}&limit=${listing.pagination.pageSize}`);
      if (response.results.length > 0) {
        let items = await services.Mercadolibre.getItems({
          apiKey: credentials.apiKey,
          password: credentials.password
        }, `?ids=${response.results.join(',')}&attributes=id,attributes,variations`);
        for (const item of items) {
          if (item.code === 200) {
            products.push({
              ...item.body
            })
          }
        }
      }
      let count = response ? Math.ceil(response.paging.total / listing.pagination.pageSize) : null;
      let rs = {
        totalRecords: response.paging.total || null,
        pagesCount: count,
        data: products
      }
      return resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
}

let getImages = (credentials, listing) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = []
      let offset = (listing.pagination.page - 1) * listing.pagination.pageSize;
      let response = await services.Mercadolibre.getProducts({
        apiKey: credentials.apiKey,
        password: credentials.password
      }, `?status=active&offset=${offset}&limit=${listing.pagination.pageSize}`);
      if (response.results.length > 0) {
        let items = await services.Mercadolibre.getItems({
          apiKey: credentials.apiKey,
          password: credentials.password
        }, `?ids=${response.results.join(',')}&attributes=id,pictures`);
        for (const item of items) {
          if (item.code === 200) {
            products.push({
              ...item.body
            })
          }
        }
      }
      let count = response ? Math.ceil(response.paging.total / listing.pagination.pageSize) : null;
      let rs = {
        totalRecords: response.paging.total || null,
        pagesCount: count,
        data: products
      }
      return resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { init, getPagination, getProducts, getVariations, getImages};
