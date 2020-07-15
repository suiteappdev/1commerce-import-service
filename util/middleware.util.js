let getMiddleWare  = (app, middleware)=>{
    return app.locals.middlewares[middleware];
}

module.exports = {
    getMiddleWare
}