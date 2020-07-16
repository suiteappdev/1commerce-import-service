

//se debe implementar este code en algun servicio/controlador en el sailsjs para traer los productos

const jwt = require('jsonwebtoken');
const axios = require('axios');

//Pasamos el obj con las credenciales del api rest woocommerce
//la url es el endpoint del servicio rest del woocomerce
//las credenciales y la version del api

let token = jwt.sign({
    url: "http://localhost",
    consumerKey: "ck_20ccc436daf55cdadcaa7e933bf3a9728f6a9833",
    consumerSecret: "cs_60b38991a13e32f1b41d32a097b29ec22f6dce58",
    version: "wc/v3"
}, 'secret');


//esta es la query
const query = `
            {
                WooCommerceProductListQuery{
                name
                description
                reference
                descriptionShort
                active
                price
                
                mainCategory {
                    id
                    name
                }
                categories{
                    id
                    name
                }
                gender
                mainColor
                width
                height
                length
                stock
                images{
                    id
                    name
                    alt
                    src
                }
                
                }
            }
  `

  //aca se lanza el request al microservicio devuelve error si falla la autenticacion
let getData = async ()=>{
    let response =  await axios.post('http://localhost:9000/graphql', { query : query}, { headers : {
        'ips-api-token' : `Bearer ${token}`
    }});

    //la respuesta con el listado de los productos
    console.log("products", response.data.data['WooCommerceProductListQuery']);
}

getData();