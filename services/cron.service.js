let fs = require('fs');
let logger;
let init = async (app, locals) => {
    logger = locals.logger.getLogger("CronService");

    return new Promise(async (resolve, reject) => {

        logger.info(`Loading Cron service`);
        let CronJob = require('cron').CronJob;

        try {
            locals.services = locals.services || {};
            locals.services.CronJob = CronJob;

            app.config.cron.map((c)=>{
                c.job = new CronJob(c.schedule, ()=>c.onTick(c.module ? locals[c.module] : locals), null, true, c.timezone);
            });

            logger.info(`Cron service done.`);

            return resolve();

        } catch (e) {
            logger.error(`Error loading  PubSub Service`);
            reject(new Error(`[ERROR]:loading  PubSub Service`));
        }
    });

}

module.exports = { init };