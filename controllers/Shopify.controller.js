
let services;
let logger;

let init = (app, locals) => {
    logger = locals.logger.getLogger("ShopifyController");

    services = locals.services || {};
    models = locals.models;
    logger.info("Initialization started.");


    locals.controllers = locals.controllers || {}

    locals.controllers.Shopify = {
        getProducts,
        getCategories,
        getTax,
        getCategoryByProductId
    }

    logger.info("Initialization finished.");

}

let each = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

let getCategoryByProductId = (credentials, productId)=>{
    return new Promise( async (resolve, reject)=>{
        let collectCount = await services.Shopify.count({
            shopName: credentials.shopName,
            apiKey: credentials.consumerSecret,
            password: credentials.password,
            version: credentials.version
        }, 'collects');

        let collectsRequest = await services.Shopify.getData({
            shopName: credentials.shopName,
            apiKey: credentials.consumerSecret,
            password: credentials.password,
            version: credentials.version
        }, 'collects',  `?limit=${collectCount.count}`).catch((e)=>reject(e));

        if(collectsRequest &&  collectsRequest.collects.length  > 0){
            let colId = collectsRequest.collects.filter(p=>p.product_id == productId);
            let category =  colId.length > 0 ? colId[0].collection_id : null;

            if(category){
                let response = await services.Shopify.getData({
                    shopName: credentials.shopName,
                    apiKey: credentials.consumerSecret,
                    password: credentials.password,
                    version: credentials.version
                }, `collections/${category}`,  ``).catch((e)=>reject(e));
    
                return resolve(response.collection);
            }

            resolve(null);

        }

    });
}

let getProducts = (credentials) => {
    return new Promise(async (resolve, reject) => {
        try {

            let responseCount = await services.Shopify.count({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'products');

            let response = await services.Shopify.getData({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'products', `?limit=${responseCount.count}`);

            return resolve(response.products);

        } catch (error) {
            reject(error);
        }
    });
}

let getTax = (type, credentials) => {
    return new Promise(async (resolve, reject) => {
        try {

            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let tax = await WooCommerce.get("taxes");

            if (tax && tax.data && tax.data.length > 0) {
                let rs = tax.data.filter((c) => c.name.toLowerCase() === type.toLowerCase());
                return resolve(rs.length > 0 ? rs[0] : null);
            }

            resolve(null);

        } catch (error) {
            reject(error);
        }
    });
}

let getCategories = (credentials) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response = await services.Shopify.getData({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'custom_collections');

            return resolve(response.custom_collections);

        } catch (error) {
            reject(error);
        }
    });
}

let getCollections = (credentials)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let collectCount = await services.Shopify.count({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'collects');
        } catch (error) {
            return reject(error);
        }

        try {
            let collectsRequest = await services.Shopify.getData({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'collects',  `?limit=${collectCount.count}`).catch((e)=>reject(e));
        
        } catch (error) {
            return reject(error);
        }

        resolve(collectsRequest.collects);
    });
}

let getVariations = (credentials, productId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let products = await WooCommerce.get(`products/${productId}/variations`)

            return resolve(products.data);

        } catch (error) {
            reject(error);
        }
    });
}

let fetchAll = (credentials)=>{
    let catalogs = {};

    return new Promise(async (resolve, reject)=>{
        try{ catalogs.products = await getProducts(credentials)}catch(e){ reject(new Error("cant get product catalog"))}
        try{ catalogs.collection = await getCollections(credentials)}catch(e){ reject(new Error("cant get product collections"))}
        
        resolve(catalogs);
    });
}


module.exports = { init, getProducts, getVariations, getCategories, getTax, getCategoryByProductId, fetchAll };