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
        getVariations,
        getImages,
        getDiscount,
        getProductId,
        getOrderId,
        addWebhookShopify,
        deleteWebhookShopify
    }

    logger.info("Initialization finished.");
}

let getPagination = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {
            let totalRecords = await services.Shopify.count({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'count', `?status=active`);

            let count = totalRecords ? Math.ceil(totalRecords.count / listing.pagination.pageSize) : null;

            let rs = {
                totalRecords: totalRecords.count || null,
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
            let data = await services.Shopify.getData({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'countries', `?fields=name,tax,tax_name`);
            
            let tax = data  ? data.countries.find(c => c.name.toLowerCase() === 'colombia') : {};

            let response = await services.Shopify.getProducts({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'products', `?limit=${listing.pagination.pageSize}${listing.pagination.next ? `&page_info=${listing.pagination.next}` : '&status=active'}&fields=id,handle,title,body_html,published_at,variants,vendor,options,status`, true);

            let totalRecords = await services.Shopify.count({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'count', `?status=active`);

            let count = totalRecords ? Math.ceil(totalRecords.count / listing.pagination.pageSize) : null;
            const resultProducts = productsColor(response.products);  
            
            let products = response.products ? resultProducts.map(p => {
                p.tax = tax ? tax : {};
                return p;
            }) : []
            products = products.filter(product => product.published_at)
            let rs = {
                totalRecords: totalRecords.count || null,
                pagination: response.pagination || null,
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
            let response = await services.Shopify.getProducts({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'products', `?limit=${listing.pagination.pageSize}${listing.pagination.next ? `&page_info=${listing.pagination.next}` : '&status=active'}&fields=id,handle,title,variants,options,status`, true);

            let totalRecords = await services.Shopify.count({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'count', `?status=active`);

            let count = totalRecords ? Math.ceil(totalRecords.count / listing.pagination.pageSize) : null;
            const resultProducts = variantsColor(response.products);

            let rs = {
                totalRecords: totalRecords.count || null,
                pagination: response.pagination || null,
                pagesCount: count,
                data: resultProducts || []
            }
            resolve(rs)
            
        } catch (error) {
            reject(error);
        }
    });
}

let getImages = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await services.Shopify.getProducts({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'products', `?limit=${listing.pagination.pageSize}${listing.pagination.next ? `&page_info=${listing.pagination.next}` : '&status=active'}&fields=id,handle,images,options,status`, true);

            let totalRecords = await services.Shopify.count({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'count', `?status=active`);

            let count = totalRecords ? Math.ceil(totalRecords.count / listing.pagination.pageSize) : null;
            const resultProducts = imageColor(response.products);
            let rs = {
                totalRecords: totalRecords.count || null,
                pagination: response.pagination || null,
                pagesCount: count,
                data: resultProducts || []
            }
            resolve(rs)

        } catch (error) {
            reject(error);
        }
    });
}

let productsColor = (products) => {
    let resultProducts = [];
    for (let product of products) {
        let option = product.options.find(o => o.name.toLowerCase() === "color");
        if (option && option.values.length > 1) {
            const ref = product.id;
            for (const value of option.values) {
                resultProducts.push({
                    ...product,
                    id: ref + '-' + value.replace(/\s/g, '')
                });
            }
        } else {
            resultProducts.push(product);
        }
    }
    return resultProducts;
}

let variantsColor = (products) => {
    let resultProducts = [];
    for (let product of products) {
        let option = product.options.find(o => o.name.toLowerCase() === "color");
        if (option && option.values.length > 1) {
            const ref = product.id;
            for (const value of option.values) {
                let variants = [];
                for (const variant of product.variants) {
                    if (variant.title.includes(value)) {
                        variants.push(variant);
                    }
                }
                resultProducts.push({
                    ...product,
                    id: ref + '-' + value.replace(/\s/g, ''),
                    variants: variants.length > 0 ? variants : product.variants
                });
            }
        } else {
            resultProducts.push(product);
        }
    }
    return resultProducts;
}

let imageColor = (products) => {
    let resultProducts = [];
    for (let product of products) {
        let option = product.options.find(o => o.name.toLowerCase() === "color");
        if (option && option.values.length > 1) {
            const ref = product.id;
            for (const value of option.values) {
                let images = [];
                for (const img of product.images) {
                    if (img.src.includes(value)) {
                        images.push(img);
                    }
                }
                resultProducts.push({
                    ...product,
                    id: ref + '-' + value.replace(/\s/g, ''),
                    images: images.length > 0 ? images : product.images
                });
            }
        } else {
            resultProducts.push(product);
        }
    }
    return resultProducts;
}

let getDiscount = (credentials) => {
    return new Promise(async (resolve) => {
        try {
            let moment = require('moment')
            let response = await services.Shopify.getData({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'price_rules', `?ends_at_min=`+ moment().format());
            let priceRule = response.price_rules.find(r =>
                moment(r.starts_at).format('YYYY/MM/DD') <= moment().add(1, 'days').format('YYYY/MM/DD') &&
                moment(r.ends_at).format('YYYY/MM/DD') >= moment().format('YYYY/MM/DD')
            )
            return resolve(priceRule);

        } catch (error) {
            resolve(null);
        }
    });
}

let getProductId = (credentials, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await services.Shopify.getData({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'countries', `?fields=name,tax,tax_name`);

            let tax = data.countries.find(c => c.name.toLowerCase() === 'colombia');

            let resultProduct = await services.Shopify.getProductId({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'products', productId, `?fields=id,handle,title,body_html,published_at,variants,vendor,options,images,tags,status`);
            
            let product = resultProduct && resultProduct.product.status === 'active' ? resultProduct.product : {};
            product.tax = tax ? tax : {};

            const resultProducts = product.id ? productColor(product) : [];
            let rs = {
                data: resultProducts
            }
            return resolve(rs);
        } catch (error) {
            reject(error);
        }
    });
}

let productColor = (product) => {
    let resultProducts = [];
    let option = product.options.find(o => o.name.toLowerCase() === "color");
    if (option && option.values.length > 1) {
        const ref = product.id;
        for (const value of option.values) {
            let variants = [];
            let images = [];
            for (const variant of product.variants) {
                if (variant.title.includes(value)) {
                    variants.push(variant);
                }
            }
            for (const img of product.images) {
                if (img.src.includes(value)) {
                    images.push(img);
                }
            }
            resultProducts.push({
                ...product,
                id: ref + '-' + value.replace(/\s/g, ''),
                variants: variants.length > 0 ? variants : product.variants,
                images: images.length > 0 ? images : product.images
            });
        }
    } else {
        resultProducts.push(product);
    }
    return resultProducts;
}

let getOrderId = (credentials, orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resultOrder = await services.Shopify.getOrderId({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, 'orders', orderId);
            let order = resultOrder ? resultOrder.order : {};
            return resolve(order);

        } catch (error) {
            reject(error.message);
        }
    });
}

let addWebhookShopify = (credentials, webhook) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resultWebhook = await services.Shopify.addWebhook({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, webhook);
            let webhookShopify = resultWebhook ? resultWebhook.webhook : {};
            return resolve(webhookShopify);
        } catch (error) {
            reject(error.message);
        }
    });
}

let deleteWebhookShopify = (credentials, webhookId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resultWebhook = await services.Shopify.deleteWebhook({
                shopName: credentials.shopName,
                apiKey: credentials.apiKey,
                password: credentials.password,
                version: credentials.version
            }, webhookId);
            let webhookShopify = resultWebhook ? {id: webhookId} : {};
            return resolve(webhookShopify);
        } catch (error) {
            reject(error.message);
        }
    });
}

module.exports = { init, getPagination, getProducts, getVariations, getImages, getDiscount, getProductId, getOrderId, addWebhookShopify, deleteWebhookShopify};
