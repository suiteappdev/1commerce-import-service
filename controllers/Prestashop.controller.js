
let services;
let logger;

let init = (app, locals) => {
    logger = locals.logger.getLogger("PrestashopController");

    services = locals.services || {};
    models = locals.models;
    logger.info("Initialization started.");

    locals.controllers = locals.controllers || {}
    locals.controllers.Prestashop = {
        getProducts
    }

    logger.info("Initialization finished.");
}

let getProducts = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await services.Prestashop.getData();
            let taxes = await services.Prestashop.getTaxes();
            const id_tax=taxes.taxes[0].id;
            response.products.map((p)=>{
                if(id_tax==p.id_tax_rules_group){
                    console.log('hola');
                    p.tax={
                        name:taxes.taxes[0].name[0].value,
                        rate:taxes.taxes[0].rate
                    }
                }else{
                    p.tax={
                        name:null,
                        rate:'0'
                    }
                };
                
            });

            let rs = {
                totalRecords :null,
                pagination : response.pagination  || null,
                pagesCount : null ,
                data : response.products || []
            }
            console.log(rs.data[0]);
            return resolve(rs);

        } catch (error) {
            reject(error);
        }
    });
}

// let getVariations = (credentials, productId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let response = await services.Shopify.requestProduct({
//                 shopName: credentials.shopName,
//                 apiKey: credentials.apiKey,
//                 password: credentials.password,
//                 version: credentials.version
//             }, 'variants', productId, `?fields=id,price,sku,inventory_quantity,option1`);
//             let rs = {
//                 data: response.variants || []
//             }
//             resolve(rs)
            
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

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

module.exports = { init, getProducts};
