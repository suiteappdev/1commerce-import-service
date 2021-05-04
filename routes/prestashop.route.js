const express = require('express');
const router = express.Router();
const { pubsub }  = require('../services/pubsub.service');
const { PRESTASHOP_PRODUCTS,PRESTASHOP_ORDERS }  = require('../graphql/schemas/subscriptions/events');

router.post('/prestashop/updateproduct/:key', async (req, res)=>{
  let key = req.params.key;
  let data = {
    productId: req.body.id_product,
    key,
    channel: 'prestashop'
  };
  pubsub.publish(PRESTASHOP_PRODUCTS, { PrestashopProducts: data });
  res.json(data);
});

router.post('/prestashop/createorder/:key', async (req, res)=>{
  const key = req.params.key;
  let data = {
    orderId: req.body.order.id,
    key,
    channel: 'prestashop',
  };
  pubsub.publish(PRESTASHOP_ORDERS, { PrestashopOrders: data });
  res.json(data);
});

module.exports = router;
