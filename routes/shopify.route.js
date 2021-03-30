const express = require('express');
const router = express.Router();
const { pubsub }  = require('../services/pubsub.service');
const { SHOPIFY_PRODUCTS }  = require('../graphql/schemas/subscriptions/events');

router.post('/shopify/createproduct/:key/:discount', async (req, res)=>{
  const key = req.params.key;
  const discount = req.params.discount === 'false' ? false : true;
  let data = {
    productId: req.body.id,
    key,
    channel: 'shopify',
    discount
  };
  pubsub.publish(SHOPIFY_PRODUCTS, { ShopifyProducts: data });
  res.json(data);
});

router.post('/shopify/updateproduct/:key/:discount', async (req, res)=>{
  const key = req.params.key;
  const discount = req.params.discount === 'false' ? false : true;
  let data = {
    productId: req.body.id,
    key,
    channel: 'shopify',
    discount
  };
  pubsub.publish(SHOPIFY_PRODUCTS, { ShopifyProducts: data });
  res.json(data);
});

module.exports = router;
