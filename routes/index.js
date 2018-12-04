var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var passport = require('passport');
var Basket = require('../models/basket');

/* GET home page. */
router.get('/', function(req, res, next) {
  Item.find(function(err, result){

    var limit = 3;
    var groupOfItems = [];
    for(var a=0; a < result.length; a = a + limit ){
        groupOfItems.push(result.slice(a, a + limit));

    }

    res.render('index', { title: 'Buy Online', items: groupOfItems });

  });
  
});

router.get('/addtocart/:id', function(req, res){

  var itemId = req.params.id;
  var basket = new Basket(req.session.basket ? req.session.basket : {});

  Item.findById(itemId, function(err, item){
    if(err)
      return res.redirect('/');

    basket.add(item, item.id);
    req.session.basket = basket;
    console.log(req.session.basket);
    res.redirect('http://localhost:3000/');

  });

});

router.get('/remove/:id', function(req, res){

  var itemId = req.params.id;
  var basket = new Basket(req.session.basket ? req.session.basket : {});

  basket.remove(itemId);
  req.session.basket = basket;
  res.redirect('/showcart');
});

router.get('/showcart', function(req, res){
    if(!req.session.basket){
      return res.render('../views/showCart', {items: null});
    }
    var basket = new Basket(req.session.basket);
    console.log(Object.values(basket.generateArray()));
    res.render('../views/showCart', {items: basket.generateArray(), finalPrice: basket.finalPrice });

});

router.get('/account', isLoggedIn, function(req, res, next){

  res.render('../views/customer/account');

});

router.get('/login', function(req, res, next){
  var alerts = req.flash('error');
  res.render('../views/customer/login', {displayErr: alerts, validateErr: alerts.length>0});

});

router.post('/login', passport.authenticate('local.login', {
  successRedirect: '/account',
  failureRedirect: '/login',
  failureFlash: true 
}) );

router.get('/register', function(req, res, next){
  var alerts = req.flash('error');
  res.render('../views/customer/register', {displayErr: alerts, validateErr: alerts.length>0});

});

router.post('/register', passport.authenticate('local.register', {
  successRedirect: '/account',
  failureRedirect: '/register',
  failureFlash: true 
}) );

router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.render('../views/customer/login');

});

router.get('/account', isLoggedIn, function(req, res, next){

  res.render('../views/customer/account');

});

router.use('/', notLoggedIn, function(req, res, next){

  res.redirect('/');

});



module.exports = router;

function isLoggedIn(req, res, next){

  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next){

  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}