
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
      getVariations
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
      if (categories.length > 0) {
        for (const category of categories) {
          let result = await services.Vtex.getProductIds({
            shopName: credentials.shopName,
            apiKey: credentials.apiKey,
            password: credentials.password
          }, {
            categoryId: category.id,
            from: 1,
            to: 3
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

let getProducts = (credentials, listing) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getProductsIds(credentials, listing);
      let products = [];
      if (data.productIds.length > 0) {
        for (const id of data.productIds) {
          let product = await services.Vtex.getProduct({
            shopName: credentials.shopName,
            apiKey: credentials.apiKey,
            password: credentials.password
          }, id);

          let variation = await services.Vtex.getVariations({
            shopName: credentials.shopName,
            apiKey: credentials.apiKey,
            password: credentials.password
          }, id);
          if (product) {
            product.width = variation ? variation.skus[0].measures.width : 0;
            product.height = variation ? variation.skus[0].measures.height : 0;
            product.length = variation ? variation.skus[0].measures.length : 0;
            product.weight = variation ? variation.skus[0].measures.weight : 0;
            product.price = variation ? variation.skus[0].bestPrice : 0;
            product.Brand = credentials.shopName;
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
        for (const id of data.productIds) {
          let variation = await services.Vtex.getVariations({
            shopName: credentials.shopName,
            apiKey: credentials.apiKey,
            password: credentials.password
          }, id);

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

// let getImages = (credentials, productId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let response = await services.Shopify.requestProduct({
//                 shopName: credentials.shopName,
//                 apiKey: credentials.apiKey,
//                 password: credentials.password,
//                 version: credentials.version
//             }, 'images', productId, `?fields=id,src,position`);
//             let rs = {
//                 data: response.images || []
//             }
//             resolve(rs)

//         } catch (error) {
//             reject(error);
//         }
//     });
// }

module.exports = { init, getProducts, getVariations };
