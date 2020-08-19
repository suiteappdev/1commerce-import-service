

//se debe implementar este code en algun servicio/controlador en el sailsjs para traer los productos

const jwt = require('jsonwebtoken');
const axios = require('axios');

//Pasamos el obj con las credenciales del api rest woocommerce
//la url es el endpoint del servicio rest del woocomerce
//las credenciales y la version del api

/*
Shopify

Clave API
9e8877c5de8113efcbb21754fee5183a

Contraseña
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

Url
https://9e8877c5de8113efcbb21754fee5183a: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@openhouseg.myshopify.com/admin/api/2020-07/orders.json

Secret
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


*/

let token = jwt.sign({
    url: "http://develop1.webstudiopanama.com/moises/",
    apiKey: "9e8877c5de8113efcbb21754fee5183a",
    consumerSecret: "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",
    password : "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",
    version: "2020-07",
    provider : 'shopify',
    shopName : 'openhouseg.myshopify.com'
}, 'secret');


//esta es la query
const query = `
            {
                ShopifyProductListQuery{
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
                weight
                length
                images{
                    file
                    position
                    cover
                    src
                }
                variations{
                    quantity
                    reference
                    talla
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

    console.dir(response.data, {depth: null, colors: true})
}

getData();