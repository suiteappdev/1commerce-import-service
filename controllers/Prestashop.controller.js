
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
