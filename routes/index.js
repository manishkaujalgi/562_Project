var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var passport = require('passport');
var Basket = require('../models/basket');

var mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var resultArray=[];
var homeresultArray=[];
let address;

var count=0;
//var Payment = require('../routes/schema.js');
var Address = require('../routes/schema.js');
var itemdetails = require('../routes/schema');


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

router.post('/otp',(req,res)=>{
  var otp= req.body.otp;
   //console.log(otp);
   mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true },function(err,db){
    var collection= db.collection('otps');
     collection.find().toArray(function(err,payitems){
    if(err) throw err;
    //console.log(typeof payitems);
    for(const objvalues of Object.values(payitems)){ //console.log(typeof objvalues);
      for( const val of Object.values(objvalues)){ //console.log(val);
      //console.log(typeof val);
      if(typeof val === 'number' && val !=0){
        resultArray.push(val);
      }}
    }
    //console.log(resultArray);
     db.close();    
   });
     });
     for( let arr in resultArray){
      if(arr === otp){
        console.log('otp matched successfully');
       res.redirect('/account');
      }
      else{
        res.redirect('/logout');
       console.log('Failed to match Otp. Please try login again');
      }
    }      
});

router.get('/otp',(req,res) =>{
  res.render('../views/otp');
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
    console.log(req.session.basket);
    var basket = new Basket(req.session.basket);
    console.log(basket);
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
  successRedirect: '/otp',
  failureRedirect: '/login',
  failureFlash: true
})
);

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

router.get('/payment', isLoggedIn, (req,res) =>{
  var basket = new Basket(req.session.basket);
  console.log(req.session.basket);
  console.log(basket);
  //console.log(Object.values(basket.generateArray()));
  console.log({items: basket.generateArray()});
  res.render('../views/pay', {items: basket.generateArray(), finalPrice: basket.finalPrice });
});

router.post('/payment', isLoggedIn, function(req,res,next){
  count=0;
  console.log(req.body);
  const Total_Price= req.body.total;
  var obj={};
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true },function(err,db){
    var collection= db.collection('addresses');
     collection.find().toArray(function(err,payitems){
    if(err) throw err;
   
    resultArray.push(payitems);
    for(var i in resultArray){
   
    for(var res in resultArray[i]){
       
        obj=resultArray[i][res];
    }
 }
 for (const [key, value] of Object.entries(obj)) {
    
     var compareKey=`${key}`;
     
     if(compareKey === "address"){
          address= `${value}`;
         console.log(address);
        
     }
     else if(compareKey === "city"){
        var city=`${value}`;
         console.log(city);
        
     }
     else if(compareKey === "state"){
        var state=`${value}`;
         console.log(state);
     }
     else if(compareKey === "phone"){
        var phonenumber=`${value}`;
         console.log(phonenumber);
     }
   }
 let transporter = nodemailer.createTransport({
     service: 'gmail',
    
     secure: false, // true for 465, false for other ports
     auth: {
         user: 'vaishu93.b@gmail.com', // generated ethereal user
         pass: 'sonicview' // generated ethereal password
     },
     tls:{rejectunauthorized:false}
 });

 // setup email data with unicode symbols
 let mailOptions = {
     from: '"Order-Confirmation Mail" <vaishu93.b@gmail.com>', // sender address
     to: 'vaishnavi.bhadresh@gmail.com', // list of receivers
     subject: 'Order Confirmation Mail ', // Subject line
     text: 'Your Details is attached as below ', // plain text body
     html: '<h2>Your Order Details is attached as below</h2><br>'+ 
     '<div>'+'<p>Shipping Address Details:</p><br>'+'<p>Address: '+ address +'</p><br>'+
     '<p>City: '+city+'</p><br>'+ '<p>State:'+state+'</p><br>'+
     '<p>Phone Number: '+phonenumber+'</p><br>'+
     '<p></p> Card Details used for Transaction:</p> <br>'+
     'Card Holder Name:'+req.body.cardholdersname+'</p>'+
     '<p>'+'Card Number:'+req.body.cardNumber + '</p></div>'+'<br><p> Total Price of your Order: </p>'+Total_Price // html body
 };

 // send mail with defined transport object
 transporter.sendMail(mailOptions, (error, info) => {
     if (error) {
         return console.log(error);
     }
     console.log('Message sent: %s', info.messageId);
    
     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
 });
});
db.close(); 
console.log("connection closed");
});
res.redirect('/login');
});
/****/ 
router.get('/checkout', isLoggedIn, (req,res)=>{
  res.render('../views/checkout');
});

router.post('/checkout', isLoggedIn, (req,res)=>{
  //console.log(req.body);
  count=0;
  mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true },function(err,db){
  var addrDet = [ new Address({
      address: req.body.address,
      city:req.body.city,
      state:req.body.state,
      phone:req.body.phone
  })];
  console.log(addrDet.length);
  for(var z = 0; z < addrDet.length; z++ ){
      addrDet[z].save(function(err, result){
          count++;
          console.log(count);
          if (count == addrDet.length){
              db.close();
              console.log('connection closed');
          }
      });
  }
});
console.log('Calling Pay');
res.redirect('/payment');
});





router.get('/additem', isLoggedIn ,(req,res) =>{
  res.render('../views/AddItem');
});

router.post('/additem', isLoggedIn ,(req,res) =>{
console.log(req.body);

mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true});

var itemDet = [ new itemdetails({
  title:req.body.title,
  detail:req.body.detailinfo,
  price:req.body.price,
  imageUrl:req.body.imagelink
})];

console.log("Length: "+itemDet.length);
 count=0;
for(var i=0; i<itemDet.length;i++){
  itemDet[i].save(function(err,result){
      count++;
      console.log("Counter: "+count)
      if(count == itemDet.length ){
          saveComplete();
      }
  });
}
res.render('../views/AddItem');
});

router.get('/home', isLoggedIn ,(req,res) =>{
  mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true},
  function(err,db){
      var collection= db.collection('items');
      collection.find().toArray(function(err,payitems){
     if(err) throw err;
      console.log("Pay Length: "+payitems.length);
      homeresultArray.push(payitems);
      for(var i in homeresultArray){
          console.log("Resukt : "+homeresultArray[i])
          for(var res in homeresultArray[i]){
              console.log(res);
              console.log(homeresultArray[i][res]);
              obj=homeresultArray[i][res];
              console.log("object: "+obj);
      }
     }
  });
  db.close();
  });
  res.render('../views/homePage', {items: homeresultArray});
});
function saveComplete(){
  mongoose.disconnect();
}

/*** */
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