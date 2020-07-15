var log4js = require('log4js');
var fs = require('fs');

var loggers = {};
var logger = getLogger("logger");

function init(app, locals){
    logger.info("Initialization started.");

    locals.logger = {
        getLogger: getLogger
    };

    try{
        fs.accessSync("./logs/global.log", fs.F_OK);
        initLog4js();
    }catch(e){
        logger.warn("Couldn't find ./logs/global.log.");
        logger.info("Try to create ./logs/global.log.");
        try{
            fs.mkdirSync("./logs");

            var stream = fs.createWriteStream("./logs/global.log");
            stream.end();

            initLog4js();
        }catch (e2){
            logger.error("Stopped the cetr initialization, can't initializes the logger.");
            logger.error("Error: "+e2.message);
            process.exit(1);
        }
    }

    logger.info("Initialization finished.");
}

function getLogger(name){
    if(name != undefined) {
        name = name+"";

        if (loggers[name] != undefined) {
            return loggers[name];
        }
        else {
            var logger = log4js.getLogger(name);

            loggers[name] = logger;

            return logger;
        }
    }
    else
        return getLogger("UNKNOWN");
}

function initLog4js(){
    logger.info("Initialization of log4js started.");

    log4js.configure({
        appenders: [
            { type: 'console' },
            {
                type: "file",
                filename: "./logs/global.log"
            }
        ]
    });
}

module.exports = {
    init: init
};