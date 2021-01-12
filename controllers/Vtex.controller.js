
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
      getImages,
      getEan,
      getQuantity,
      getProductId
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
            let color = variation && variation.dimensionsMap ? variation.dimensionsMap.Color[0] : '';
            let sku = variation.skus.find(sku => sku.available === true);
            let price = sku.listPrice !== 0 ? sku.listPrice : sku.bestPrice;
            product.width = variation ? sku.measures.width : 0;
            product.height = variation ? sku.measures.height : 0;
            product.length = variation ? sku.measures.length : 0;
            product.weight = variation ? sku.measures.weight : 0;
            product.price = variation ? price / 100 : 0;
            product.tax = variation ? {tax: sku.taxAsInt != 0 ? sku.taxAsInt : 19 , name: 'iva'} : {};
            product.color = variation && variation.dimensionsMap ? variation.dimensionsMap.Color[0] : '';
            product.Brand = brand;
            product.textLink = product.LinkId.split('-').join(' ') + ' ' + color.replace('.png','').split('_')[1];
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
          } else {
            variations.push({productId: element.productId, skus: []})
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

let getEan = (credentials, skuId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ean = await services.Vtex.getEan({
        shopName: credentials.shopName,
        apiKey: credentials.apiKey,
        password: credentials.password
      }, skuId);
      return resolve(ean && ean.length > 0 ? ean[0] : '');

    } catch (error) {
      reject(error);
    }
  });
}

let getQuantity = (credentials, skuId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let balance = await services.Vtex.getQuantity({
        shopName: credentials.shopName,
        apiKey: credentials.apiKey,
        password: credentials.password
      }, skuId);
      let total = balance ? balance.totalQuantity - balance.reservedQuantity : 0
      return resolve(total < 0 ? 0 : total);

    } catch (error) {
      reject(error);
    }
  });
}

let getProductId = (credentials, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let variation = await services.Vtex.getVariations({
        shopName: credentials.shopName,
        apiKey: credentials.apiKey,
        password: credentials.password
      }, productId);

      let product = await services.Vtex.getProduct({
        shopName: credentials.shopName,
        apiKey: credentials.apiKey,
        password: credentials.password
      }, productId);

      let brand = await services.Vtex.getBrand({
        shopName: credentials.shopName,
        apiKey: credentials.apiKey,
        password: credentials.password
      }, product.BrandId);
      let getSku = [];
      let price = 0;
      let color = variation && variation.dimensionsMap ? variation.dimensionsMap.Color[0].replace('.png','').split('_')[1] : 'Multicolor';
      let sku = variation ? variation.skus.find(sku => sku.available === true) : undefined;
      if (sku) {
        getSku = await services.Vtex.getSku({
          shopName: credentials.shopName,
          apiKey: credentials.apiKey,
          password: credentials.password
        }, sku.sku);
        price = sku.listPrice !== 0 ? sku.listPrice : sku.bestPrice;
      }
      product.width = variation ? sku.measures.width : 0;
      product.height = variation ? sku.measures.height : 0;
      product.length = variation ? sku.measures.length : 0;
      product.weight = variation ? sku.measures.weight : 0;
      product.price = variation ? price / 100 : 0;
      product.tax = variation ? {tax: sku.taxAsInt != 0 ? sku.taxAsInt : 19 , name: 'iva'} : {};
      product.Brand = brand;
      product.textLink = product.LinkId.split('-').join(' ') + ' ' + color;
      product.Images = variation && getSku.Images.length > 0 ? getSku.Images : [];
      product.name = product.Name;
      product.skus = variation ? variation.skus : [];
      return resolve(product);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { init, getPagination, getProducts, getVariations, getImages, getEan, getQuantity, getProductId };
