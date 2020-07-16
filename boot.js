const fs = require('fs');
const cors = require('cors');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const CONTROLLER_DIR = `${__dirname}/controllers/`;
const SERVICE_DIR = `${__dirname}/services/`;
const ROUTE_DIR = `${__dirname}/routes/`;
const { publicGraph } = require('./graphql/schemas/');

const utilMiddleware = require('./util/middleware.util');

let getControllers = ()=>{
    return new Promise((resolve, reject)=>{
        fs.readdir(`${CONTROLLER_DIR}`, (err, items) => {
            if(err){
                return reject(err);
            }

            resolve(items.filter( (js)=>js.match('.js') ) );
        });   
    });
}

let getServices = ()=>{
    return new Promise((resolve, reject)=>{
        fs.readdir(`${SERVICE_DIR}`, (err, items) => {
            if(err){
                return reject(err);
            }

            resolve(items.filter( (js)=>js.match('.js') ) );
        });   
    }); 
}

let getRoutes= ()=>{
    return new Promise((resolve, reject)=>{
        fs.readdir(`${ROUTE_DIR}`, (err, items) => {
            if(err){
                return reject(err);
            }

            resolve(items.filter( (js)=>js.match('.js') ) );
        });   
    }); 
}


let boot = async (app) =>{
    let controllers = await getControllers();
    let services = await getServices();
    let routes = await getRoutes();

    return new Promise(async (resolve, reject)=>{
        try{
           
            app.use(cors());
            app.use(bodyParser.json());
            app.use(morgan("dev"));

            for(s in services){
                let service = require(`${SERVICE_DIR}${services[s]}`);
                await service.init(app, app.locals);
            }

            for(c in controllers){
                let contrls = require(`${CONTROLLER_DIR}${controllers[c]}`)
                await contrls.init(app, app.locals);
            }

            for(r in routes){
                app.use('/api/',  require(`${ROUTE_DIR}${routes[r]}`));
            }

            app.use(
                '/graphql',
                graphqlHTTP((req, res, params)=>({
                    schema: publicGraph,
                    graphiql: true,
                    context: { req }
                })),
            );

            app.locals.mainController = {
                returnError: returnError,
                apiResponder : apiResponder,
                graphiqlResponder :  graphiqlResponder
            };

            resolve(true);

        }catch(e){
            console.log(e.message);
            return reject(e);
        }
    });
}

const returnError = (res, httpCode, code)=>{
    res.status(httpCode);
    res.send(JSON.stringify({error_id: code}));
    res.end();
}

const apiResponder = (res, httpCode, data)=>{
    if(Object.keys(data).length > -1){
        res.status(httpCode);
        res.json(data);
        
        return res.end();
    }

    res.status(httpCode);
    res.send(JSON.stringify(data));
    res.end();
}

const graphiqlResponder = (status, type)=>{
    return {};
}

module.exports = {
    boot
}