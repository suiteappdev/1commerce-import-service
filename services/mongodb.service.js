let fs = require('fs');
let logger;
let mongoose  = require('mongoose');

let init = async (app, locals) => {
    logger = locals.logger.getLogger("MongodbService");

    return new Promise(async (resolve, reject) => {

        logger.info(`Loading Mongodb service`);

        try {
            locals.services = locals.services || {};
            logger.info(`Mongodb Service service done.`);

            return resolve(mongoose.connect(app.config.mongodb, { useNewUrlParser: true , useUnifiedTopology : true }));

        } catch (e) {
            logger.error(`Error loading  Mongodb Service`);
            reject(new Error(`[ERROR]:loading  Mongodb Service`));
        }
    });

}

module.exports = { init };