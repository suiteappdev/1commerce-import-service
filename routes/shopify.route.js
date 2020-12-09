const express = require('express');
const router = express.Router();
const stripHtml = require("string-strip-html");
const { pubsub }  = require('../services/pubsub.service') ;

router.post('/shopify/createproduct/:identifier', async (req, res)=>{
    let identifier = req.params.identifier;
    let data = transformProduct(req.body) || {};
    data.identifier = identifier;
    pubsub.publish(SHOPIFY_PRODUCT_CREATED, { ProductCreated: data });
    res.json(data);
});

function transformProduct(obj) {
  let iva = parseInt(obj.tax.tax * 100) || 0;
  let price = obj.variants[0].compare_at_price ? obj.variants[0].compare_at_price : obj.variants[0].price ? obj.variants[0].price : 0;
  let data = {
    name: obj.title,
    externalId: obj.id,
    reference: obj.id,
    description: stripHtml(obj.body_html || obj.title),
    descriptionShort: stripHtml(obj.body_html || obj.title),
    active: obj.published_at != '' ? true : false,
    price: obj.variants[0].taxable ? Math.ceil(price / (1+(iva/100))) : price,
    // tax: obj.variants[0].taxable ? obj.tax : {},
    manufacturer: obj.vendor,
    width: obj.dimensions ? parseInt(obj.dimensions.width == "" ? 0 : obj.dimensions.width) : 0,
    height: obj.dimensions ? parseInt(obj.dimensions.height == "" ? 0 : obj.dimensions.width) : 0,
    length: obj.dimensions ? (obj.dimensions.length.length > 0 ? parseInt(obj.dimensions.length) : 0) : 0,
    weight: obj.variants[0].weight ? parseFloat(obj.variants[0].weight == "" ? 0 : obj.variants[0].weight) : 0,
  }
  return data;
}

module.exports = router;
