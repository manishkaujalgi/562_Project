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

router.get('/account', isLoggedIn, function(req, res, next){

  res.render('../views/customer/account');

});

router.use('/', notLoggedIn, function(req, res, next){

  res.render('/');

});

router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.render('../views/customer/login');

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