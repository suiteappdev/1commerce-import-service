
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
            let count = await services.Prestashop.getCount(credentials);
            let tax_rules = await services.Prestashop.getIdTaxes(credentials);
            let taxes = await services.Prestashop.getTaxes(credentials);

            if(response.products){
                for (let i = 0; i < response.products.length; i++) {
                    let array_id_images=response.products[i].associations.images;
                    let id_images=[];
                    response.products[i].images={};
                    if(array_id_images){
                        for (let index = 0; index < array_id_images.length; index++) {
                            let id_img=array_id_images[index].id;
                            let file=id_img+'.jpg';
                            let src=credentials.url+`/${id_img}-extra_large_default/${response.products[i].link_rewrite}.jpg`;                      
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
        }
            let rs = {
                totalRecords :count.products.length,
                pagination : response.pagination  || null,
                pagesCount : Math.ceil((count.products.length / listing.pagination.pageSize)) ,
                data : response.products || []
            }
            return resolve(rs);

        } catch (error) {
            reject(error);
        }
    });
}

let getVariations = (credentials, listing) => {
  const moment = require('moment');
    return new Promise(async (resolve, reject) => {
        try {
            let variations=[];
            let combinations;
            let external_id;
            let products = await services.Prestashop.getData(credentials,listing);
            let quantities = await services.Prestashop.getQuantities(credentials);
            let attributes = await services.Prestashop.getAttributes(credentials);
            let tax_rules = await services.Prestashop.getIdTaxes(credentials);
            let taxes = await services.Prestashop.getTaxes(credentials);
            let discounts = await services.Prestashop.getDiscounts(credentials);
            let discount_names = await services.Prestashop.getDiscountNames(credentials);

            if(products.products){

                products=products.products;

                for (let index = 0; index < taxes.taxes.length; index++) {
                    for (let i = 0; i < products.length; i++) {
                        let id_tax=tax_rules.find(tr => tr.tax_rules_group = products[i].id_tax_rules_group).id_tax;
                        if((taxes.taxes[index].id)==id_tax){
                            products[i].tax={
                                name:taxes.taxes[index].name,
                                rate:taxes.taxes[index].rate
                            }
                        }else{
                            products[i].tax={
                                name:null,
                                rate:'0'
                            }
                        };
                    }
                }
                

                
                for (let index = 0; index < products.length; index++) {
                    let discount=[];
                    let disc=discounts.filter(d => d.id_product == products[index].id);
                    if(disc.length>1){
                        disc=disc.sort((a,b) => b.from.localeCompare(a.from));
                        disc.length = 1;
                    }
                    disc=disc[0];
                    if(disc){
                        disc.name=discount_names.find(dn => dn.id == disc.id_specific_price_rule);
                        products[index].discount={
                            name:products[index].name ? products[index].name:'',
                            from: moment(disc.from).format('YYYY/MM/DD HH:mm:ss'),
                            to:moment(disc.to).format('YYYY/MM/DD HH:mm:ss'),
                            type:disc.reduction_type === 'percentage' ? 'P' : 'C',
                            value:disc.reduction*100
                        };

                        discount.push(products[index].discount);
                    }
                    let variations_product=[];
                    external_id=products[index].id;
                    combinations = await services.Prestashop.getCombinations(credentials, products[index].id);
                    
                    if (combinations) {
                        for (let i = 0; i < combinations.length; i++) {
                            let id_attr=combinations[i].associations.product_option_values[0].id;
                            let attr=attributes.product_option_values.find(a => a.id == id_attr);
                            let id_variation=combinations[i].id;
                            let quantity=quantities.find(q => q.id_product_attribute == id_variation).quantity;
                            
                            combinations[i].quantity=quantity;
                            combinations[i].tax=products[index].tax;
                            if(combinations[i].price==0){
                                combinations[i].price=products[index].price;
                            }
                            
                            
                            if(attr.id_attribute_group=='3'){
                                combinations[i].talla='';
                            }else{
                                combinations[i].talla=attr.name;
                            }
                            variations_product.push(combinations[i]);
                        }

                    }
                    let obj={
                        external_id:external_id,
                        discount: discount,
                        reference: products[index].reference,
                        variations:variations_product
                    }
                    variations.push(obj);

                }
            }
            
            let rs = {
                totalRecords: listing.pageSize,
                pagesCount: Math.ceil((listing.pagination.pageSize / listing.pagination.pageSize)),
                data : variations || []
            }
            
            return resolve(rs);
            


        } catch (error) {
            reject(error);
        }
    });
}

let getProductId = (credentials, productId) => {
    const moment = require('moment');
    return new Promise(async (resolve, reject) => {
        try {
            let product = await services.Prestashop.getProductId(credentials,productId);
            let tax_rules = await services.Prestashop.getIdTaxes(credentials);
            let taxes = await services.Prestashop.getTaxes(credentials);
            let discounts = await services.Prestashop.getDiscounts(credentials);
            let discount_names = await services.Prestashop.getDiscountNames(credentials);
            let quantities = await services.Prestashop.getQuantities(credentials);
            let attributes = await services.Prestashop.getAttributes(credentials);
            let combinations;

            if(product){
                
                let array_id_images=product.associations.images;
                let id_images=[];
                product.images={};
                if(array_id_images){
                    for (let index = 0; index < array_id_images.length; index++) {
                        let id_img=array_id_images[index].id;
                        let file=id_img+'.jpg';
                        let src=credentials.url+`/${id_img}-extra_large_default/${product.link_rewrite}.jpg`;                      
                        let obj={        
                            file,
                            src
                        };
                        id_images.push(obj);
                        product.images=id_images;
                    }
                }else{
                    let obj={        
                        file:'',
                        src:''
                    };
                    id_images.push(obj);
                    product.images=id_images; 
                }        

                taxes.taxes.map((t)=>{
                    let id_tax=tax_rules.find(tr => tr.tax_rules_group = product.id_tax_rules_group).id_tax;
                    if((t.id)==id_tax){
                        product.tax={
                            name:t.name,
                            rate:t.rate
                        }
                    }else{
                        product.tax={
                            name:null,
                            rate:'0'
                        }
                    };
                });

                let discount=[];
                let disc=discounts.filter(d => d.id_product == product.id);
                if(disc.length>1){
                    disc=disc.sort((a,b) => b.from.localeCompare(a.from));
                    disc.length = 1;
                }
                disc=disc[0];
                if(disc){
                    disc.name=discount_names.find(dn => dn.id == disc.id_specific_price_rule);
                    product.discount={
                        name:product.name ? product.name:'',
                        from: moment(disc.from).format('YYYY/MM/DD HH:mm:ss'),
                        to:moment(disc.to).format('YYYY/MM/DD HH:mm:ss'),
                        type:disc.reduction_type === 'percentage' ? 'P' : 'C',
                        value:disc.reduction*100
                    };

                    discount.push(product.discount);
                }
                let variations_product=[];
                combinations = await services.Prestashop.getCombinations(credentials, product.id);
                
                if (combinations) {
                    for (let i = 0; i < combinations.length; i++) {
                        let id_attr=combinations[i].associations.product_option_values[0].id;
                        let attr=attributes.product_option_values.find(a => a.id == id_attr);
                        let id_variation=combinations[i].id;
                        let quantity=quantities.find(q => q.id_product_attribute == id_variation).quantity;
                        
                        combinations[i].quantity=quantity;
                        combinations[i].tax=product.tax;
                        if(combinations[i].price==0){
                            combinations[i].price=product.price;
                        }
                        
                        
                        if(attr.id_attribute_group=='3'){
                            combinations[i].talla='';
                        }else{
                            combinations[i].talla=attr.name;
                        }
                        variations_product.push(combinations[i]);
                    }

                }
                let obj={
                    external_id:product.id,
                    discount: discount,
                    reference: product.reference,
                    variations:variations_product
                }
                product.variations=obj;
            }
            return resolve(product);

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { init, getProducts, getVariations, getProductId};
