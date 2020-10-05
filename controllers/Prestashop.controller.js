var convert = require('xml-js');
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
            let response = await services.Prestashop.getData(credentials);
            let taxes = await services.Prestashop.getTaxes(credentials);
            
                for (let i = 0; i < response.products.length; i++) {
                    let resxml = await services.Prestashop.getImages(credentials,response.products[i].id);
                    let resjson = JSON.parse(convert.xml2json(resxml));
                    let array_id_images=resjson.elements[0].elements[0].elements;
                    let id_images=[];
                    response.products[i].images={};

                    for (let index = 0; index < array_id_images.length; index++) {
                        let id_img_digits = [];
                        let id_img=array_id_images[index].attributes.id;
                        let file=id_img+'.jpg';
                        for(let j = 0; j < id_img.length; j++){
                            id_img_digits.push(id_img.substr(j, 1));
                        }
                        let src=credentials.url+`/img/p/${id_img_digits.join('/')}/${id_img}.jpg`;                      
                        let obj={        
                            file,
                            src
                        };
                        id_images.push(obj);
                        response.products[i].images=id_images;
                    }
                }


           

            taxes.taxes.map((t)=>{
                response.products.map((p)=>{
                    if((t.id+1)==p.id_tax_rules_group){//////////////el uno es para que funcione, al parecer registraron un 2 como id del impuesto para el producto, pero despues borraron la regla
                        p.tax={
                            name:t.name,
                            rate:t.rate
                        }
                    }else{
                        p.tax={
                            name:null,
                            rate:'0'
                        }
                    };
            });

                
            });
            
            let rs = {
                totalRecords :null,
                pagination : response.pagination  || null,
                pagesCount : null ,
                data : response.products || []
            }
            return resolve(rs);

        } catch (error) {
            reject(error);
        }
    });
}

let getVariations = (credentials, productId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let WooCommerce = new services.WooCommerceRestApi(credentials);
            let products = await WooCommerce.get(`products/${productId}/variations`);

            if (products && products.data) {
                return resolve(products.data);
            }

            resolve([])

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { init, getProducts, getVariations};
