
let services;
let logger;

let init = (app, locals) => {
    logger = locals.logger.getLogger("VtexController");

    services = locals.services || {};
    models = locals.models;
    logger.info("Initialization started.");

    locals.controllers = locals.controllers || {}
    locals.controllers.Vtex = {
      getProducts,
      getVariations,
      getImages
    }

    logger.info("Initialization finished.");
}

let getProductsIds = (credentials, listing) => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await services.Vtex.getCategories({
        shopName: credentials.shopName,
        apiKey: credentials.apiKey,
        password: credentials.password
      });
      let productIds = [];
      let total = 0;
      let from = ((listing.pagination.page - 1 ) * listing.pagination.pageSize + 1);
      let to = listing.pagination.page * listing.pagination.pageSize;

      if (categories.length > 0) {
        for (const category of categories) {
          let result = await services.Vtex.getProductIds({
            shopName: credentials.shopName,
            apiKey: credentials.apiKey,
            password: credentials.password
          }, {
            categoryId: category.id,
            from,
            to
          })
          productIds = productIds.concat(result.data);
          total += result.range.total;
        }
      }
		  return resolve({productIds, total});
    } catch (error) {
      reject(error);
    }
  });
}

let getPagination = (credentials, listing) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getProductsIds(credentials, listing);
      let count = Math.ceil(data.total / listing.pagination.pageSize);
      let rs = {
        totalRecords: data.total,
        pagesCount: count,
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
      let data = await getProductsIds(credentials, listing);
      let products = [];
      console.log(data.productIds.length);
      if (data.productIds.length > 0) {
        for (const element of data.productIds) {
          let variation = await services.Vtex.getVariations({
            shopName: credentials.shopName,
            apiKey: credentials.apiKey,
            password: credentials.password
          }, element.productId);

          if (variation) {
            let product = await services.Vtex.getProduct({
              shopName: credentials.shopName,
              apiKey: credentials.apiKey,
              password: credentials.password
            }, element.productId);

            let brand = await services.Vtex.getBrand({
              shopName: credentials.shopName,
              apiKey: credentials.apiKey,
              password: credentials.password
            }, product.BrandId);

            product.width = variation ? variation.skus[0].measures.width : 0;
            product.height = variation ? variation.skus[0].measures.height : 0;
            product.length = variation ? variation.skus[0].measures.length : 0;
            product.weight = variation ? variation.skus[0].measures.weight : 0;
            product.price = variation ? variation.skus[0].bestPrice : 0;
            product.Brand = brand;
            products.push(product);
          }
        }
      }
      let count = Math.ceil(data.total / listing.pagination.pageSize);
      let rs = {
        totalRecords: data.total,
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
      let data = await getProductsIds(credentials, listing);
      let variations = [];
      if (data.productIds.length > 0) {
        for (const element of data.productIds) {
          let variation = await services.Vtex.getVariations({
            shopName: credentials.shopName,
            apiKey: credentials.apiKey,
            password: credentials.password
          }, element.productId);

          if (variation) {
            variations.push(variation);
          }
        }
      }
      let count = Math.ceil(data.total / listing.pagination.pageSize);
      let rs = {
        totalRecords: data.total,
        pagesCount: count,
        data: variations
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
      let data = await getProductsIds(credentials, listing);
      let images = [];
      if (data.productIds.length > 0) {
        for (const element of data.productIds) {
          var i = 0;
          while (i < element.skus.length) {
            let getSku = await services.Vtex.getSku({
              shopName: credentials.shopName,
              apiKey: credentials.apiKey,
              password: credentials.password
            }, element.skus[i]);
            if (getSku.Images.length > 0){
              images.push(getSku);
              break;
            }
            i++;
          }
        }
      }
      let count = Math.ceil(data.total / listing.pagination.pageSize);
      let rs = {
        totalRecords: data.total,
        pagesCount: count,
        data: images
      }
      return resolve(rs);
      
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { init, getPagination, getProducts, getVariations, getImages };
