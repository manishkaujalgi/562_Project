var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var passport = require('passport');

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

router.get('/login', function(req, res, next){

  res.render('../views/customer/login');

});

// router.post('/login', function(req, res, next){

//   res.redirect('/');

// });

router.get('/register', function(req, res, next){

  res.render('../views/customer/register');

});

router.post('/login', passport.authenticate('local.register', {
  successRedirect: '/account',
  failureRedirect: '/register' 
}) );

router.get('/account', function(req, res, next){

  res.render('../views/customer/account');

});

module.exports = router;
