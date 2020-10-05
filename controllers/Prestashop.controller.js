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
            let response = await services.Prestashop.getData();
            let taxes = await services.Prestashop.getTaxes();
  
            
                for (let i = 0; i < response.products.length; i++) {
                    let resxml = await services.Prestashop.getImages(response.products[i].id);
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
                        let src=`http://superalimentos.store/img/p/${id_img_digits.join('/')}/${id_img}.jpg`;                      
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
                    if(t.id==p.id_tax_rules_group){
                        p.tax={
                            name:t.name[0].value,
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

module.exports = { init, getProducts};
