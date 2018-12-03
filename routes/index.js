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

router.post('/login', function(req, res, next){

  res.redirect('/');

});

router.get('/register', function(req, res, next){
  var alerts = req.flash('error');
  res.render('../views/customer/register', {displayErr: alerts, validateErr: alerts.length>0});

});

router.post('/register', passport.authenticate('local.register', {
  successRedirect: '/account',
  failureRedirect: '/register',
  failureFlash: true 
}) );

router.get('/account', function(req, res, next){

  res.render('../views/customer/account');

});

module.exports = router;
