const express = require('express');
const router = express.Router();
const { pubsub }  = require('../services/pubsub.service');
const { VTEX_PRODUCTS, VTEX_ORDERS }  = require('../graphql/schemas/subscriptions/events');

router.post('/vtex/products/:key/:discount', async (req, res)=>{
  const key = req.params.key;
  const discount = req.params.discount === 'false' ? false : true;
  let data = {
    productId: req.body.ProductId,
    key,
    channel: 'vtex',
    discount
  };
  pubsub.publish(VTEX_PRODUCTS, { VtexProducts: data });
  res.json(data);
});

router.post('/vtex/orders/:key', async (req, res)=>{
  const key = req.params.key;
  let data = {
    orderId: req.body.OrderId,
    key,
    channel: 'vtex',
  };
  pubsub.publish(VTEX_ORDERS, { VtexOrders: data });
  res.json(data);
});

module.exports = router;