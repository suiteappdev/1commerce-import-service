const express = require('express');
const router = express.Router();
const { pubsub }  = require('../services/pubsub.service');
const { SHOPIFY_PRODUCTS }  = require('../graphql/schemas/subscriptions/events');

router.post('/shopify/createproduct/:key', async (req, res)=>{
  let key = req.params.key;
  let data = {
    productId: req.body.id,
    key,
    channel: 'shopify'
  };
  pubsub.publish(SHOPIFY_PRODUCTS, { ShopifyProducts: data });
  res.json(data);
});

router.post('/shopify/updateproduct/:key', async (req, res)=>{
  let key = req.params.key;
  let data = {
    productId: req.body.id,
    key,
    channel: 'shopify'
  };
  pubsub.publish(SHOPIFY_PRODUCTS, { ShopifyProducts: data });
  res.json(data);
});

module.exports = router;
