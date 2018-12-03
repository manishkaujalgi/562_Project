var express = require('express');
var router = express.Router();
var Item = require('../models/item');

/* GET home page. */
router.get('/', function(req, res, next) {
  Item.find(function(err, result){

    var limit = 3;
    var groupOfItems = [];
    for(var a=0; a < result.length; a = a + limit ){
        groupOfItems.push(result.slice(a, a + limit));

    }

    res.render('index', { title: 'Express', items: groupOfItems });

  });
  
});

router.get('/login', function(req, res){

  res.render('../views/customer/login');

});

router.get('/register', function(req, res){

  res.render('../views/customer/register');

});

module.exports = router;
