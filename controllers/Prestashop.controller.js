
let services;
let logger;

let init = (app, locals) => {
    logger = locals.logger.getLogger("PrestashopController");

    services = locals.services || {};
    models = locals.models;
    logger.info("Initialization started.");

    locals.controllers = locals.controllers || {}
    locals.controllers.Prestashop = {
        getProducts,
        getOrderId
    }

    logger.info("Initialization finished.");
}

let getProducts = (credentials, listing) => {
    return new Promise(async (resolve, reject) => {
        try {
            let optionColor=[];
            let optionMarca=[];
            let response = await services.Prestashop.getData(credentials,listing);
            let count = await services.Prestashop.getCount(credentials);
            let tax_rules = await services.Prestashop.getIdTaxes(credentials);
            let taxes = await services.Prestashop.getTaxes(credentials);
            let attributes = await services.Prestashop.getAttributes(credentials);
            let optionsCms = await services.Prestashop.getOptions(credentials);

            let resultOptions = optionsCms.filter(option => option.name.toLowerCase().includes('color'))
            let resultOptionsMarca = optionsCms.filter(option => option.name.toLowerCase().includes('marca'))
            for (const option of resultOptions) {
                optionColor = [...optionColor, ...option.associations.product_option_values];
            }
            for (const option of resultOptionsMarca) {
                optionMarca = [...optionMarca, ...option.associations.product_option_values];
            }

            let products = response.products.filter(product => product.active == '1')
            if(products){
                for (let i = 0; i < products.length; i++) {
                    for (const option of products[i].associations.product_option_values) {
                        let optColor = optionColor.find(a => a.id == option.id);
                        let optMarca = optionMarca.find(a => a.id == option.id);
                        if (optColor) {
                            let attr = attributes.product_option_values.find(a => a.id == optColor.id);
                            products[i].color = attr.name;
                        }
                        if (!products[i].manufacturer_name && optMarca) {
                            let attr = attributes.product_option_values.find(a => a.id == optMarca.id);
                            products[i].manufacturer_name = attr.name;
                        }
                    }
                    let array_id_images=products[i].associations.images;
                    let id_images=[];
                    products[i].images={};
                    if(array_id_images){
                        for (let index = 0; index < array_id_images.length; index++) {
                            let id_img=array_id_images[index].id;
                            let file=id_img+'.jpg';
                            let src=credentials.url+`/${id_img}-extra_large_default/${products[i].link_rewrite}.jpg`;                      
                            let obj={        
                                file,
                                src
                            };
                            id_images.push(obj);
                            products[i].images=id_images;
                        }
                    }else{
                        let obj={        
                            file:'',
                            src:''
                        };
                        id_images.push(obj);
                        products[i].images=id_images; //Condicional para los productos que no tienen imagenes
                    }
                }
                taxes.taxes.map((t)=>{
                    products.map((p)=>{
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
                data : products || []
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
            let optionTallas=[];
            let combinations;
            let external_id;
            let products = await services.Prestashop.getData(credentials,listing);
            let optionsCms = await services.Prestashop.getOptions(credentials);
            let quantities = await services.Prestashop.getQuantities(credentials);
            let attributes = await services.Prestashop.getAttributes(credentials);
            let discounts = await services.Prestashop.getDiscounts(credentials);
            let discount_names = await services.Prestashop.getDiscountNames(credentials);

            let resultOptions = optionsCms.filter(option => option.name.toLowerCase().includes('talla'))
            for (const option of resultOptions) {
                optionTallas = [...optionTallas, ...option.associations.product_option_values];
            }

            if(products.products){
                products=products.products;               
                for (let index = 0; index < products.length; index++) {
                    let discount=[];
                    let disc=discounts.filter(d => (d.id_product == products[index].id)&&(moment(moment(d.to).valueOf()).isSameOrAfter(moment().valueOf())));
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
                            for (const option of combinations[i].associations.product_option_values) {
                                let optionTalla = optionTallas.find(a => a.id == option.id);
                                if (optionTalla) {
                                    let attr = attributes.product_option_values.find(a => a.id == optionTalla.id);
                                    combinations[i].talla = attr.name;
                                }
                            }
                            let id_variation=combinations[i].id;
                            let quantity=quantities.find(q => q.id_product_attribute == id_variation).quantity;
                            
                            combinations[i].quantity=quantity;
                            combinations[i].tax=products[index].tax;
                            if(combinations[i].price==0){
                                combinations[i].price=products[index].price;
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
            let optionColor=[];
            let optionMarca=[];
            let optionTallas=[];
            let product = await services.Prestashop.getProductId(credentials,productId);
            let tax_rules = await services.Prestashop.getIdTaxes(credentials);
            let taxes = await services.Prestashop.getTaxes(credentials);
            let discounts = await services.Prestashop.getDiscounts(credentials);
            let optionsCms = await services.Prestashop.getOptions(credentials);
            let discount_names = await services.Prestashop.getDiscountNames(credentials);
            let quantities = await services.Prestashop.getQuantities(credentials);
            let attributes = await services.Prestashop.getAttributes(credentials);
            let combinations;

            let resultOptionsTalla = optionsCms.filter(option => option.name.toLowerCase().includes('talla'))
            let resultOptions = optionsCms.filter(option => option.name.toLowerCase().includes('color'))
            let resultOptionsMarca = optionsCms.filter(option => option.name.toLowerCase().includes('marca'))

            for (const option of resultOptions) {
                optionColor = [...optionColor, ...option.associations.product_option_values];
            }
            for (const option of resultOptionsMarca) {
                optionMarca = [...optionMarca, ...option.associations.product_option_values];
            }
            for (const option of resultOptionsTalla) {
                optionTallas = [...optionTallas, ...option.associations.product_option_values];
            }
            if(product){
                let array_id_images=product.associations.images;
                let id_images=[];
                product.images={};
                if(array_id_images){
                    for (let index = 0; index < array_id_images.length; index++) {
                        let id_img=array_id_images[index].id;
                        let file=id_img+'.jpg';
                        let src=credentials.url+`/${id_img}/${product.link_rewrite}.jpg`;                      
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

                for (const option of product.associations.product_option_values) {
                    let optColor = optionColor.find(a => a.id == option.id);
                    let optMarca = optionMarca.find(a => a.id == option.id);
                    if (optColor) {
                        let attr = attributes.product_option_values.find(a => a.id == optColor.id);
                        product.color = attr.name;
                    }
                    if (!product.manufacturer_name && optMarca) {
                        let attr = attributes.product_option_values.find(a => a.id == optMarca.id);
                        product.manufacturer_name = attr.name;
                    }
                }

                let discount=[];
                let disc=discounts.filter(d => (d.id_product == product.id)&&(moment(moment(d.to).valueOf()).isSameOrAfter(moment().valueOf())));
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
                        for (const option of combinations[i].associations.product_option_values) {
                            let optionTalla = optionTallas.find(a => a.id == option.id);
                            if (optionTalla) {
                                let attr = attributes.product_option_values.find(a => a.id == optionTalla.id);
                                combinations[i].talla = attr.name;
                            }
                        }
                        let id_variation=combinations[i].id;
                        let quantity=quantities.find(q => q.id_product_attribute == id_variation).quantity;
                        
                        combinations[i].quantity=quantity;
                        combinations[i].tax=product.tax;
                        if(combinations[i].price==0){
                            combinations[i].price=product.price;
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

let getOrderId = (credentials, orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await services.Prestashop.getOrderId(credentials,orderId);
            if (order){
                let customer = await services.Prestashop.getCustomer(credentials,order.id_customer);
                let status = await services.Prestashop.getStatus(credentials,order.current_state);
                let address = await services.Prestashop.getAddress(credentials,order.id_address_delivery);
                let country = await services.Prestashop.getCountry(credentials,address.id_country);
                let state = await services.Prestashop.getState(credentials,address.id_state);
                order.customer = customer;
                order.status = status;
                order.address = address;
                order.address.country = country;
                order.address.state = state;
            }
            return resolve(order);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { init, getProducts, getVariations, getProductId, getOrderId};
