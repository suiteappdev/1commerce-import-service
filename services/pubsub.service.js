let fs = require('fs');
let logger;
const { PubSub }  = require('graphql-subscriptions') ;
const pubsub = new PubSub();

let init = async (app, locals) => {
    logger = locals.logger.getLogger("PubSubService");

    return new Promise(async (resolve, reject) => {

        logger.info(`Loading PubSub service`);

        try {
            locals.services = locals.services || {};

            let pubsub = new PubSub(); 
            locals.services.PubSub = pubsub;

            logger.info(`PubSub service done.`);

            return resolve();

        } catch (e) {
            logger.error(`Error loading  PubSub Service`);
            reject(new Error(`[ERROR]:loading  PubSub Service`));
        }
    });

}

module.exports = { init, pubsub};