var express = require('express');
var router = express.Router();

router.get('/woocommerce/products', async (req, res)=>{
    mainController = req.app.locals.mainController;

    let products = await req.app.locals.controllers.WooCommerce.getProducts(req, res).catch((e)=>{
        return mainController.returnError(res, 500, 0);
    });

    res.status(200).json(products);
});

router.get('/hook/woocommerce/:identifier', async (req, res)=>{
    mainController = req.app.locals.mainController;
    res.json({ test : 'test' });
});

module.exports = router;
