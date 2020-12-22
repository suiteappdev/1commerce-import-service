const express = require('express');
const router = express.Router();
const { pubsub }  = require('../services/pubsub.service');
const { PRESTASHOP_PRODUCTS }  = require('../graphql/schemas/subscriptions/events');

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

module.exports = router;
