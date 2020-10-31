

//se debe implementar este code en algun servicio/controlador en el sailsjs para traer los productos

const jwt = require('jsonwebtoken');
const axios = require('axios');
const { response } = require('express');
const fs = require('fs');
const path = require('path');

let load = (request, data)=>{
    try {
        let xml = fs.readFileSync(path.join(__dirname, 'xml','siesa', request), 'utf8').toString();

        Object.keys(data).forEach((k)=>{
            xml = xml.replace(`{{${k}}}`, data[k]);
        });

        return xml;

    } catch (e) {
        console.log(`El archivo xml non existe : ${e.message}`);        
    }
}

let getParams = async ()=>{
    let body = load('parametros.xml', {});

    const options = {
        method: 'POST',
        url: 'http://wscnadar.siesacloud.com:8043/WSUNOEE/WSUNOEE.asmx',
        headers: {
           'Content-Type': 'text/xml',
            SOAPAction: 'http://tempuri.org/LeerEsquemaParametros'
        },
        body : body
    }

    let response = await axios(options).catch(e => console.log(e))

    console.log(response)
}

let getConnection = async ()=>{
    let body = load('connection.xml', {
        name : '10.148.2.187',
        type : 'SQL',
        db : 'UnoEE_Cnadar_Real',
        user : 'Cnadar',
        password : 'Cnadar$12$%',
        host : '10.148.2.187',
        connection : 16
    });

    const options = {
        method: 'POST',
        url: 'http://wscnadar.siesacloud.com:8043/WSUNOEE/WFConexion.aspx',
        headers: {
           'Content-Type': 'text/xml',
            SOAPAction: 'http://tempuri.org/CrearConexionXML'
        },
        body : body
    }

    let response = await axios(options).catch(e => console.log(e))

    console.log(response)
}

getParams();