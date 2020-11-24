module.exports = {
    JWT_SECRET : '123455688',
    auth_header : '-api-key',
    mongodb:process.env.MONGODB || 'mongodb://localhost:27017/microservice',
    cron : [{
        timezone : 'America/Bogota',
        schedule : '*/1 * * * *',
        module : ['controllers'],
        onTick : async (controllers)=>{
            let orders = await controllers.Siesa.getBatchOrders();

            if(orders && orders.length > 0){
                let newOrders = await controllers.Siesa.saveBatchOrders(orders);
            }

            console.log("running and injecting module every 5 minutes", orders);
        }
    }]
}