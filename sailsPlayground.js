

//se debe implementar este code en algun servicio/controlador en el sailsjs para traer los productos

const jwt = require('jsonwebtoken');
const axios = require('axios');

//Pasamos el obj con las credenciales del api rest woocommerce
//la url es el endpoint del servicio rest del woocomerce
//las credenciales y la version del api

let token = jwt.sign({
    url: "http://develop1.webstudiopanama.com/moises/",
    consumerKey: "ck_7f7954d728760cf952ecf782cf93c49bdaa6abf7",
    consumerSecret: "cs_01c6139ce2c46cb12766d27e388ae85450f3cfee",
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
                    description
                    parent
                    active
                    url
                    level
                    createdAt
                    updateAt
                    dafiti
                    mercadolibre
                    linio
                }
                categories{
                    id
                    name
                    description
                    parent
                    active
                    url
                    level
                    createdAt
                    updateAt
                    dafiti
                    mercadolibre
                    linio
                }
                gender
                mainColor
                width
                height
                length
                images{
                    file
                    position
                    product
                    cover
                    src
                }
                variations{
                    quantity
                    reference
                    upc
                    price
                    ean13
                }
                }
            }
  `

  //aca se lanza el request al microservicio devuelve error si falla la autenticacion
let getData = async ()=>{
    let response =  await axios.post('http://localhost:9000/graphql', { query : query}, { headers : {
        'ips-api-token' : `Bearer ${token}`
    }}).catch((e)=>console.log(e.message));

    //la respuesta con el listado de los productos

    console.dir(response.data.data['WooCommerceProductListQuery'], {depth: null, colors: true})
}

getData();