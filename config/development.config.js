const { pubsub }  = require('../services/pubsub.service') ;
module.exports = {
    JWT_SECRET : '123455688',
    auth_header : '-api-key',
    mongodb:process.env.MONGODB || 'mongodb://localhost:27017/microservice',
    cron : [{
        timezone : 'America/Bogota',
        schedule : '*/1 * * * *',
        module : ['controllers'],
        onTick : async (controllers)=>{
            const moment = require('moment');
            
            let ini = moment().format('YYYYMMDD');
            let end = moment().format('YYYYMMDD');

            let orders = await controllers.Siesa.getBatchOrders(ini, end);

            if(orders && orders.length > 0){
                await controllers.Siesa.saveBatchOrders(orders);
            }
        }
    }]
}