var express = require('express');
var router = express.Router();
var payment= require('../routes/payment');
var checkout = require('../routes/checkout');
var addItem = require('../routes/addItem');
var home = require('../routes/home');

router.post('/payment',payment);

router.get('/checkout',checkout);

router.post('/checkout',checkout);

router.get('/additem',addItem);

router.post('/additem',addItem);

router.get('/home',home);

module.exports = router;