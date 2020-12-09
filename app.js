let express = require("express");
const {createServer} = require('http');
let app = express();
let logger = require('log4js');
let config = require(`./config/${process.env.NODE_ENV || 'development'}.config.js`);
const { execute, subscribe } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws') ;

app.workspace = __dirname;
app.locals.logger = logger;
app.config = config;

(async app => {

    let isReady = await require('./boot').boot(app).catch((e) => {
        throw (new Error(`[ERROR]: starting app ${e.message}`));
    })

    if (isReady) {
        app.httpServer.listen(/*process.env.PORT || */9000, function () {
            console.log(`[${process.env.NODE_ENV || 'development'}] - 1commerce-import-service on PORT ${(process.env.PORT || 443)}`);
            app.config.cron.map((c)=>c.job.start());
        });
    }
})(app);

