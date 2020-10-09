
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
            let response = await services.Prestashop.getData(credentials,listing);
            let tax_rules = await services.Prestashop.getIdTaxes(credentials);
            let taxes = await services.Prestashop.getTaxes(credentials);
            // console.log(id_tax);
            
                // let id_tax=tax_rules.find(tr => tr.tax_rules_group == id_attr).id_tax;
                
                for (let i = 0; i < response.products.length; i++) {
                    let array_id_images=response.products[i].associations.images;
                    let id_images=[];
                    response.products[i].images={};
                    if(array_id_images){
                        for (let index = 0; index < array_id_images.length; index++) {
                            let id_img_digits = [];
                            let id_img=array_id_images[index].id;
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
                    }else{
                        let obj={        
                            file:'',
                            src:''
                        };
                        id_images.push(obj);
                        response.products[i].images=id_images; //Condicional para los productos que no tienen imagenes
                    }

                }


             

            taxes.taxes.map((t)=>{
                response.products.map((p)=>{
                    let id_tax=tax_rules.find(tr => tr.tax_rules_group = p.id_tax_rules_group).id_tax;
                    if((t.id)==id_tax){
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
                totalRecords :listing.pagination.pageSize,
                pagination : response.pagination  || null,
                pagesCount : Math.ceil((listing.pagination.pageSize / listing.pagination.pageSize)) ,
                data : response.products || []
            }
            return resolve(rs);

        } catch (error) {
            reject(error);
        }
    });
}

let getVariations = (credentials, productId,attributes) => {
    return new Promise(async (resolve, reject) => {
        try {

            let variations = await services.Prestashop.getCombinations(credentials,productId);
            let quantities = await services.Prestashop.getQuantities(credentials,productId);
            let attributes = await services.Prestashop.getAttributes(credentials);

            if (variations) {
                for (let index = 0; index < variations.length; index++) {
                    let id_attr=variations[index].associations.product_option_values[0].id;
                    let attr=attributes.product_option_values.find(a => a.id == id_attr);
                    let id_variation=variations[index].id;
                    let quantity=quantities.find(q => q.id_product_attribute == id_variation).quantity;
                    
                    variations[index].quantity=quantity;
                    
                    if(attr.id_attribute_group=='3'){
                        variations[index].talla='';
                    }else{
                        variations[index].talla=attr.name;
                    }
                    
                }

                let rs = {
                    data : variations || []
                }
                return resolve(rs);
            }

            resolve([])

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { init, getProducts, getVariations};
