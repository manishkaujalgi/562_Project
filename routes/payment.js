var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var resultArray=[];
let address;
let city;
let state;
let phonenumber;
var Payment = require('../routes/schema.js');
router.post('/payment',function(req,res,next){
   // console.log(req.body);
    mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true });
    var count=0;
    var payDet=[ new Payment({
        cardHoldername:req.body.cardholdersname,
        cardNumber:req.body.cardNumber,
        expiryMonth:req.body.month,
        expiryYear:req.body.year,
        cvv:req.body.cvv
    })];
    console.log("pay length :"+payDet.length)
    for(var z = 0; z < payDet.length; z++ ){
        payDet[z].save(function(err, result){
            count++;
            console.log("count: "+count);
            if (count == payDet.length)
                saveComplete();
        });
    }
    var obj={};
   mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true },function(err,db){
       var collection= db.collection('addresses');
        collection.find().toArray(function(err,payitems){
       if(err) throw err;
      //console.log(payitems.length);
       resultArray.push(payitems);
       for(var i in resultArray){
      // console.log(resultArray[i])
       for(var res in resultArray[i]){
           //console.log(res);
          // console.log(resultArray[i][res]);
           obj=resultArray[i][res];
       }
    }
    for (const [key, value] of Object.entries(obj)) {
       // console.log(`${key} ${value}`); 
        var compareKey=`${key}`;
        //console.log('compatere key'+ compareKey);
        if(compareKey === "address"){
             address= `${value}`;
            console.log(address);
            //global.address=address;
        }
        else if(compareKey === "city"){
           var city=`${value}`;
            console.log(city);
            //global.city=city;
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
       // port: 587,
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
        '<p>'+'Card Number:'+req.body.cardNumber + '</p></div>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
   });
db.close(); 
console.log("connection closed");
});
res.render('login');
});

function saveComplete(){
    mongoose.disconnect();
}
module.exports = router ;