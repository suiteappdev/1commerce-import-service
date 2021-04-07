var express = require('express');
var router = express.Router();
const { pubsub }  = require('../services/pubsub.service');
const { WOOCOMMERCE_PRODUCTS }  = require('../graphql/schemas/subscriptions/events');

router.post('/updated_product/woocommerce/:key/:separate_product_by_color', async (req, res)=>{
  let key = req.params.key;
  let data = {
    productId: req.body.id,
    key,
    channel: 'woocommerce',
    separate_product_by_color : req.params.separate_product_by_color  ? true : false
  };

  pubsub.publish(WOOCOMMERCE_PRODUCTS, { WoocommerceProducts: data });
  res.status(200).end();
});

module.exports = router;
