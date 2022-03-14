
let services;
let logger;

let init = (app, locals) => {
    logger = locals.logger.getLogger("WooCommerceController");

    services = locals.services || {};
    models = locals.models;
    logger.info("Initialization started.");


    locals.controllers = locals.controllers || {}

    locals.controllers.WooCommerce = {
        getProducts,
        getVariations,
        getImages,
        getPagination,
        getProductId,
        addWebhook,
        updateWebhook
    }

    logger.info("Initialization finished.");
}

let getPagination = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {
            credentials.queryStringAuth = true;
            credentials.verifySsl =  false;
            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let response = await WooCommerce.get(`products`, { per_page: listing.pagination.pageSize, page: listing.pagination.page });
            
            resolve({
                totalRecords : (response.headers['x-wp-total']),
                pagesCount : parseInt(response.headers['x-wp-totalpages'])
            });

        } catch (error) {
            reject(error);
        }
    });
}

let getProducts = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {
            credentials.queryStringAuth = true;
            credentials.verifySsl =  false;
            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let response = await WooCommerce.get("products", { per_page: listing.pagination.pageSize, page: listing.pagination.page });
            let tax = await WooCommerce.get("taxes");
            
            let findTax = (taxClass, taxes)=>{
                return tax.data.filter((c) => c.name.toLowerCase() === taxClass.toLowerCase());
            }

            let results = response.data.map((p)=>{
                let tx = findTax(p.tax_class, tax);

                if(!tx || tx.length == 0){
                    p.tax = tax.data.filter(t=>t.class === 'standard')[0]
                }

                return p;
            });


            resolve({
                totalRecords : (response.headers['x-wp-total']),
                pagesCount : parseInt(response.headers['x-wp-totalpages']),
                data : results || []
            });

        } catch (error) {
            reject(error);
        }
    });
}

let getVariations = (credentials, pro) => {
    return new Promise(async (resolve, reject) => {
        try {
            credentials.queryStringAuth = true;
            credentials.verifySsl =  false;
            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let products = await WooCommerce.get(`products/${pro.id}/variations`);
            let tax = await WooCommerce.get("taxes");
            
            let findTax = (taxClass, taxes)=>{
                return tax.data.filter((c) => c.name.toLowerCase() === taxClass.toLowerCase());
            }

            let results = products.data.map((p)=>{
                let tx = findTax(p.tax_class, tax);

                if(!tx || tx.length == 0){
                    p.tax = tax.data.filter(t=>t.class === 'standard')[0]
                }

                return p;
            });
            resolve(results)

        } catch (error) {
            reject(error);
        }
    });
}

let getProductId = (credentials, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            credentials.queryStringAuth = true;
            credentials.verifySsl =  false;
            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let products = await WooCommerce.get(`products/${id}`);
            let tax = await WooCommerce.get("taxes");
            
            let findTax = (taxClass, taxes)=>{
                return tax.data.filter((c) => c.name.toLowerCase() === taxClass.toLowerCase());
            }

            let tx = findTax(products.data.tax_class, tax);

            if(!tx || tx.length == 0){
                products.data.tax = tax.data.filter(t=>t.class === 'standard')[0];
            }
            if (products && products.data) {
                return resolve(products.data);
            }

            resolve([])

        } catch (error) {
            reject(error);
        }
    });
}

let getImages = (credentials, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            credentials.queryStringAuth = true;
            credentials.verifySsl =  false;
            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let product = await WooCommerce.get(`products/${productId}`);
            if (product && product.data.images) {
                return resolve({data: product.data.images});
            }

            resolve({data: []})

        } catch (error) {
            reject(error);
        }
    });
}

let getOrderId = (credentials, orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            credentials.queryStringAuth = true;
            credentials.verifySsl =  false;
            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let order = await WooCommerce.get(`orders/${orderId}`);
           
            if (order && order.data) {
                return resolve(order.data);
            }

            resolve({ data: [] })

        } catch (error) {
            reject(error);
        }
    });
}

let addWebhook = (credentials, webhook) => {
    return new Promise(async (resolve, reject) => {
        try {
            credentials.queryStringAuth = true;
            credentials.verifySsl =  false;
            let WooCommerce = new services.WooCommerceRestApi(credentials);
              
            let response = await WooCommerce.post("webhooks", webhook);
           
            if (response && response.data) {
                return resolve(response.data);
            }

            resolve({});

        } catch (error) {
            reject(error);
        }
    });
}

let updateWebhook = (credentials,webhookId, webhook) => {
    return new Promise(async (resolve, reject) => {
        try {
            credentials.queryStringAuth = true;
            credentials.verifySsl =  false;
            let WooCommerce = new services.WooCommerceRestApi(credentials);
              
            let response = await WooCommerce.put(`webhooks/${webhookId}`, { status :  webhook.status });
           
            if (response && response.data) {
                return resolve(response.data);
            }

            resolve({});

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { init, getPagination, getProducts, getVariations, getImages, getProductId, getOrderId, addWebhook, updateWebhook };