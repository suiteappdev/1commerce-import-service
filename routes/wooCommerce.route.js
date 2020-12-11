var express = require('express');
var router = express.Router();
const { pubsub }  = require('../services/pubsub.service');
const { WOOCOMMERCE_PRODUCT_CREATED }  = require('../graphql/schemas/subscriptions/events');

router.post('/hook/woocommerce/:key', async (req, res)=>{
    let key = req.params.key;
    let data = {
      productId: req.body.id,
      key,
      channel: 'woocommerce'
    };
    pubsub.publish(WOOCOMMERCE_PRODUCT_CREATED, { WoocommerceProductCreated: data });
    res.json(data);
});

module.exports = router;
