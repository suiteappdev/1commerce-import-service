
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
        let collectsRequest = await services.Shopify.getData({
            shopName: credentials.shopName,
            apiKey: credentials.consumerSecret,
            password: credentials.password,
            version: credentials.version
        }, 'collects',  `?limit=${1000}`, false).catch((e)=>reject(e));

        if(collectsRequest &&  collectsRequest.collects.length  > 0){
            let colId = collectsRequest.collects.filter(p=>p.product_id == productId);
            let category =  colId.length > 0 ? colId[0].collection_id : null;

            if(category){
                let response = await services.Shopify.getData({
                    shopName: credentials.shopName,
                    apiKey: credentials.consumerSecret,
                    password: credentials.password,
                    version: credentials.version
                }, `collections/${category}`,  ``, false).catch((e)=>reject(e));
    
                return resolve(response.collection);
            }

            resolve(null);

        }

    });
}


let getCollects = (credentials)=>{
    return new Promise(async (resolve, reject)=>{
        try {
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
            
            resolve(collectsRequest.collects);

        } catch (error) {
            reject(error);
        }

    });
}

let getProducts = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {

            let categories = await getCategories(credentials);

            let response = await services.Shopify.getData({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'products', `?limit=${listing.pagination.pageSize}${listing.pagination.next ? `&page_info=${listing.pagination.next}` : ''}`, true);
            
            let rs = {
                totalRecords :null,
                pagination : response.pagination  || null,
                pagesCount : null ,
                data : response.products.map((p)=>{
                    p.categories = categories;
                    return p;
                }) || []
            }

            return resolve(rs);

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
            let categories = [];

            let responseCustomCollection = await services.Shopify.getData({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'custom_collections', '', false);

            let responseSmartCollection = await services.Shopify.getData({
                shopName: credentials.shopName,
                apiKey: credentials.consumerSecret,
                password: credentials.password,
                version: credentials.version
            }, 'smart_collections', '', false);

            categories = [...responseCustomCollection.custom_collections, ...responseSmartCollection.smart_collections];

            return resolve(categories);

        } catch (error) {
            reject(error);
        }
    });
}

let categorize  = (product_id, collections, categories)=>{
    let colId = collections.filter(p=>p.product_id == product_id);
    return colId.length > 0 ? colId[0].collection_id : null;
}

module.exports = { init, getProducts, getCategories, getTax, getCategoryByProductId, categorize, getCollects };