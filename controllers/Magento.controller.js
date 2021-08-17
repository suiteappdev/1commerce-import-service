let services;
let logger;

let init = (app, locals) => {
  logger = locals.logger.getLogger("MagentoController");

  services = locals.services || {};
  models = locals.models;
  logger.info("Initialization started.");

  locals.controllers = locals.controllers || {}
  locals.controllers.magento = {
    getPagination,
    getProducts,
    getVariations,
    getStockItem,
    getImages
  }

  logger.info("Initialization finished.");
}

let getPagination = (credentials, listing) => {
  return new Promise(async (resolve, reject) => {
    try {
      let totalRecords = await services.Magento.getProducts({
        shopName: credentials.shopName,
        password: credentials.password
      }, `?searchCriteria[pageSize]=1&searchCriteria[currentPage]=1&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[filterGroups][0][filters][0][field]=type_id&searchCriteria[filterGroups][0][filters][0][value]=configurable&searchCriteria[filterGroups][1][filters][1][conditionType]=like&searchCriteria[filterGroups][1][filters][1][field]=status&searchCriteria[filterGroups][1][filters][1][value]=1`);
      let count = totalRecords ? Math.ceil(totalRecords.total_count / listing.pagination.pageSize) : null;

      let rs = {
        totalRecords: totalRecords.total_count || null,
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
      let taxes = await services.Magento.getTax({
        shopName: credentials.shopName,
        password: credentials.password
      }, `?searchCriteria[pageSize]=0`);

      let attrTax = await services.Magento.getAttributes({
        shopName: credentials.shopName,
        password: credentials.password
      }, `tax_class_id`);

      let colors = await services.Magento.getAttributes({
        shopName: credentials.shopName,
        password: credentials.password
      }, `color`);

      let msgBrands = await services.Magento.getAttributes({
        shopName: credentials.shopName,
        password: credentials.password
      }, `mgs_brand`);

      let response = await services.Magento.getProducts({
        shopName: credentials.shopName,
        password: credentials.password
      }, `?searchCriteria[pageSize]=${listing.pagination.pageSize}&searchCriteria[currentPage]=${listing.pagination.page}&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[filterGroups][0][filters][0][field]=type_id&searchCriteria[filterGroups][0][filters][0][value]=configurable&searchCriteria[filterGroups][1][filters][1][conditionType]=like&searchCriteria[filterGroups][1][filters][1][field]=status&searchCriteria[filterGroups][1][filters][1][value]=1`); 

      let count = response.total_count ? Math.ceil(response.total_count / listing.pagination.pageSize) : null;
      const resultProducts = productsColor(response.items, colors, msgBrands);
      
      let products = response.items ? resultProducts.map(p => {
        const attr = p.custom_attributes.find(attr => attr.attribute_code === 'tax_class_id')
        const valueTax = attrTax.find(atax => atax.value === attr.value)
        const tax = taxes ? taxes.find(tax => tax.code === valueTax.label) : {}
        p.tax = tax ? tax : {};
        return p;
      }) : []

      let rs = {
        totalRecords: response.total_count || null,
        pagesCount: count,
        data: products
      }
      return resolve(rs);

    } catch (error) {
      reject(error);
    }
  });
}

let productsColor = (products, colors, msgBrands) => {
  let resultProducts = [];
  for (let product of products) {
    let option = product.extension_attributes.configurable_product_options.find(o => o.label.toLowerCase() === "color");
    const attr = product.custom_attributes.find(attr => attr.attribute_code === 'mgs_brand')
    let valueBrand = attr ? msgBrands.find(msg => msg.value === attr.value) : null;
    if (option && option.values.length > 0) {
      const ref = product.sku;
      for (const value of option.values) {
        const color = colors.find(c => c.value == value.value_index)
        resultProducts.push({
          ...product,
          sku: ref + ' ' + color.label,
          name: product.name + ' ' + color.label,
          brand: valueBrand ? valueBrand.label : ''
        });
      }
    } else {
      resultProducts.push({...product, brand: valueBrand ? valueBrand.label : ''});
    }
  }
  return resultProducts;
}

let getVariations = (credentials, listing) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await services.Magento.getProducts({
        shopName: credentials.shopName,
        password: credentials.password
      }, `?searchCriteria[pageSize]=${listing.pagination.pageSize}&searchCriteria[currentPage]=${listing.pagination.page}&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[filterGroups][0][filters][0][field]=type_id&searchCriteria[filterGroups][0][filters][0][value]=configurable&searchCriteria[filterGroups][1][filters][1][conditionType]=like&searchCriteria[filterGroups][1][filters][1][field]=status&searchCriteria[filterGroups][1][filters][1][value]=1`); 

      let colors = await services.Magento.getAttributes({
        shopName: credentials.shopName,
        password: credentials.password
      }, `color`);

      let sizes = await services.Magento.getAttributes({
        shopName: credentials.shopName,
        password: credentials.password
      }, `size`);

      let count = response.total_count ? Math.ceil(response.total_count / listing.pagination.pageSize) : null;
      const resultProducts = await variantsColor(response.items, colors, sizes, credentials);

      let rs = {
        totalRecords: response.total_count || null,
        pagesCount: count,
        data: resultProducts || []
      }
      resolve(rs)
    } catch (error) {
      reject(error);
    }
  });
}

let variantsColor = async (products, colors, sizes, credentials) => {
  let resultProducts = [];
  for (let product of products) {
    let option = product.extension_attributes.configurable_product_options.find(o => o.label.toLowerCase() === "color");
    if (option && option.values.length > 0) {
      const ref = product.sku;
      let variations = await services.Magento.getVariations({
        shopName: credentials.shopName,
        password: credentials.password
      }, ref);
      for (const value of option.values) {
        let variants = [];
        let color = colors.find(c => c.value == value.value_index)
        for (const variant of variations) {
          if (variant.name.includes(color.label)) {
            const attr = variant.custom_attributes.find(attr => attr.attribute_code === 'size')
            const size = sizes.find(s => s.value == attr.value)
            variants.push({
              ...variant,
              size: size.label
            });
          }
        }
        resultProducts.push({
          ...product,
          sku: ref + ' ' + color.label,
          variants: variants
        });
      }
    } else {
      resultProducts.push(product);
    }
  }
  return resultProducts;
}

let getStockItem = async (credentials, sku) => {
  let stock = await services.Magento.getStockItem({
    shopName: credentials.shopName,
    password: credentials.password
  }, sku);
  return stock ? stock.qty : 0
}

let getImages = (credentials, listing) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await services.Magento.getProducts({
        shopName: credentials.shopName,
        password: credentials.password
      }, `?searchCriteria[pageSize]=${listing.pagination.pageSize}&searchCriteria[currentPage]=${listing.pagination.page}&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[filterGroups][0][filters][0][field]=type_id&searchCriteria[filterGroups][0][filters][0][value]=configurable&searchCriteria[filterGroups][1][filters][1][conditionType]=like&searchCriteria[filterGroups][1][filters][1][field]=status&searchCriteria[filterGroups][1][filters][1][value]=1`); 

      let colors = await services.Magento.getAttributes({
        shopName: credentials.shopName,
        password: credentials.password
      }, `color`);

      let count = response.total_count ? Math.ceil(response.total_count / listing.pagination.pageSize) : null;
      const resultProducts = await imagesColor(response.items, colors, credentials);

      let rs = {
        totalRecords: response.total_count || null,
        pagesCount: count,
        data: resultProducts || []
      }
      resolve(rs)

    } catch (error) {
      reject(error);
    }
  });
}

let imagesColor = async (products, colors, credentials) => {
  let resultProducts = [];
  for (let product of products) {
    let option = product.extension_attributes.configurable_product_options.find(o => o.label.toLowerCase() === "color");
    if (option && option.values.length > 0) {
      const ref = product.sku;
      let variations = await services.Magento.getVariations({
        shopName: credentials.shopName,
        password: credentials.password
      }, ref);
      for (const value of option.values) {
        let resultImages = [];
        let color = colors.find(c => c.value == value.value_index)
        for (const variant of variations) {
          if (variant.name.includes(color.label)) {
            let images = await services.Magento.getMediaItem({
              shopName: credentials.shopName,
              password: credentials.password
            }, variant.sku);
            resultImages = images ? images : [];
          }
        }
        resultProducts.push({
          ...product,
          sku: ref + ' ' + color.label,
          images: resultImages
        });
      }
    } else {
      resultProducts.push(product);
    }
  }
  return resultProducts;
}

module.exports = {init, getPagination, getProducts, getVariations, getStockItem, getImages};
