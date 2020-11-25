
let services;
let models;
let logger;
const mongoose = require('mongoose');
const { pubsub }  = require('../services/pubsub.service') ;

let init = (app, locals) => {
    logger = locals.logger.getLogger("SiesaController");

    services = locals.services || {};
    models = app.models;
    logger.info("Initialization started.");


    locals.controllers = locals.controllers || {}

    locals.controllers.Siesa = {
        getBatchOrders,
        saveBatchOrders
    }

    logger.info("Initialization finished.");
}

let getBatchOrders = (ini, end) => {
    return new Promise(async (resolve, reject) => {
        try {

            let orders = await services.Siesa.getBatchOrders(ini, end);

            return resolve(orders);
       
        } catch (error) {
            reject(error);
        }
    });
}

let saveBatchOrders = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (let index = 0; index < data.length; index++) {
                const orderIndex = data[index];
                const status = ['En elaboración', 'Retenido', 'Aprobado', 'Comprometido', 'Cumplido', 'Anulado']
               
                let order =  await models.Order.findOne({ oc_referencia: orderIndex.oc_referencia });

                if(order){
                    if(order.estado != orderIndex.estado){
                        let statusIndex = parseInt(orderIndex.estado);
                        await models.Order.updateOne({oc_referencia: orderIndex.oc_referencia}, orderIndex);
                        
                        pubsub.publish('ORDER_STATUS_CHANGED', {
                            OrderStatusChanged: {
                                reference :order.oc_referencia,
                                status : orderIndex.estado,
                                statusText :status[statusIndex] 
                            }
                        });
                    }
                }else{
                    let newOrder = new models.Order(orderIndex);
                    await newOrder.save((e, doc)=>{
                        if(e)return console.log(e);
                    });

                }

            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { init, getBatchOrders, saveBatchOrders };