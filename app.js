let express = require("express");
let app = express();
let logger = require('log4js');
let config = require(`./config/${process.env.NODE_ENV || 'development'}.config.js`);
app.workspace = __dirname;
app.locals.logger = logger;
app.config = config;

(async app => {

    let isReady = await require('./boot').boot(app).catch((e) => {
        throw (new Error(`[ERROR]: starting app ${e.message}`));
    })

    if (isReady) {
        app.listen(process.env.PORT || 9000, function () {
            console.log(`[${process.env.NODE_ENV || 'development'}] - 1commerce-import-service on PORT ${(process.env.PORT || 9000)}`);
        });
    }

})(app);


