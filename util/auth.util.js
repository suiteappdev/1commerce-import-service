var jwt = require('jsonwebtoken');

let getToken = (req)=>{
    let header = req.headers['ips-api-token'];

    if(header){
        return req.headers['ips-api-token'].split(' ')[1] || null;
    }
    
    return null;
}

let validate = (token)=>{
    return jwt.verify(token, 'secret');
}

module.exports  = {
    getToken,
    validate
}