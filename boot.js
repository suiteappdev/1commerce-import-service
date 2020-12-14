const fs = require('fs');
const cors = require('cors');
const morgan = require("morgan");
const bodyParser = require('body-parser');

const CONTROLLER_DIR = `${__dirname}/controllers/`;
const SERVICE_DIR = `${__dirname}/services/`;
const ROUTE_DIR = `${__dirname}/routes/`;
const MODELS_DIR = `${__dirname}/models/`;

const utilMiddleware = require('./util/middleware.util');

const { ApolloServer, gql}  = require('apollo-server-express');
const { graphiqlExpress }  = require('apollo-server-express');

const http = require('http');
const { execute, subscribe } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { publicGraph } = require('./graphql/schemas/');

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
            app.use(morgan("dev"));
            app.use(bodyParser.json());

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

            const apolloServer = new ApolloServer({ schema: publicGraph, playground : true,
                subscriptions: {
                onConnect: (connectionParams, webSocket)=>{
                    console.log('Client connected');
                }},
                context: ({ req }) => {
                    return  {
                        req,
                    }
                },
                introspection:true
            });

            apolloServer.applyMiddleware({ app });
            
            const httpServer = http.createServer(app);
            apolloServer.installSubscriptionHandlers(httpServer);

            app.httpServer = httpServer;
            app.publicGraph = publicGraph


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