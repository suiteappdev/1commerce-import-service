let publicPaths = require('../config/public.paths');
let config = require(`../config/${process.env.NODE_ENV || 'development'}.config.js`);
let jwt = require('jsonwebtoken');

let getToken = (req)=>{
    let header = req.headers[config.auth_header];

    if(header){
        return req.headers[config.auth_header].split(' ')[1] || null;
    }
    
    return null;
}

let auth = (req, res, next)=>{
    if(Object.values(publicPaths).indexOf(req.path) > -1){
        next();
    }else{
        let token  = getToken(req);

        if(!token){
            return req.app.locals.mainController.apiResponder(res, 401, { message : 'No auth token provided'});
        }

        try {
            let result = jwt.verify(token, config.JWT_SECRET);
            
            if(result){
                return next();
            }

        } catch (error) {
            return req.app.locals.mainController.apiResponder(res, 401, { message : 'Invalid auth header token'});
        }

        return req.app.locals.mainController.apiResponder(res, 401, { message : 'Invalid auth header token'});
    }
}

let Init = (app, locals) => {
    locals.middlewares = locals.middlewares || {};
	locals.middlewares.auth =  auth;
}

module.exports = Init;