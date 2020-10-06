

//se debe implementar este code en algun servicio/controlador en el sailsjs para traer los productos

const jwt = require('jsonwebtoken');
const axios = require('axios');
const { response } = require('express');

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
    apiKey: "vtexappkey-speedoco-LBCIYP",
    password : "EPUTATWIOQVJGMHNPEBBTBBPJXLLSBRHOMYOBOVYDAZEFIHSBVZZMXTCNEKCIKQMYNVUNTMBJDXTCXJAPSJWBSVQSWAWDSQSKNFSMNFIJYQIAAAPUJNPBTKGRFCRSPXQ",
    shopName : 'speedoco'
}, 'secret');
// console.log(token)
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
    const options = {
        method: 'GET',
        url: 'https://speedoco.vtexcommercestable.com.br/api/catalog/pvt/stockkeepingunitkit',
        params: {skuId: '131'},
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          'x-vtex-api-appkey': 'vtexappkey-speedoco-LBCIYP',
          'x-vtex-api-apptoken': 'EPUTATWIOQVJGMHNPEBBTBBPJXLLSBRHOMYOBOVYDAZEFIHSBVZZMXTCNEKCIKQMYNVUNTMBJDXTCXJAPSJWBSVQSWAWDSQSKNFSMNFIJYQIAAAPUJNPBTKGRFCRSPXQ'
        }
      };
    let response = await axios(options).catch(e => console.log(e))

    console.log(response)
}

getData();