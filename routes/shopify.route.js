var express = require('express');
var router = express.Router();
const { pubsub }  = require('../services/pubsub.service') ;

router.post('/shopify/createproduct/:identifier', async (req, res)=>{
    let identifier = req.params.identifier;
    let data = req.body || {};
    data.identifier = identifier;
    console.log("data", data);
    // pubsub.publish(SHOPIFY_PRODUCT_CREATED, { ProductCreated: data });
    res.json(data);
});

module.exports = router;
