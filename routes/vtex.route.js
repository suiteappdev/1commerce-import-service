const express = require('express');
const router = express.Router();
const { pubsub }  = require('../services/pubsub.service');
const { VTEX_PRODUCTS }  = require('../graphql/schemas/subscriptions/events');

router.post('/vtex/products/:key', async (req, res)=>{
  let key = req.params.key;
  console.log(req.body);
  let data = {
    productId: req.body.ProductId,
    key,
    channel: 'vtex'
  };
  pubsub.publish(VTEX_PRODUCTS, { VtexProducts: data });
  res.json(data);
});

// router.post('/shopify/updateproduct/:key', async (req, res)=>{
//   let key = req.params.key;
//   let data = {
//     productId: req.body.id,
//     key,
//     channel: 'shopify'
//   };
//   pubsub.publish(SHOPIFY_PRODUCTS, { ShopifyProducts: data });
//   res.json(data);
// });

module.exports = router;