const express = require('express');
const router = express.Router();
const { pubsub }  = require('../services/pubsub.service');
const { VTEX_PRODUCTS }  = require('../graphql/schemas/subscriptions/events');

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

module.exports = router;