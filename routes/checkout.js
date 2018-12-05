var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Address = require('../routes/schema.js');

var resultArray=[];
var count=0;

router.get('/checkout', (req,res)=>{
    res.render('checkout');
});

router.post('/checkout',(req,res)=>{
    //console.log(req.body);
    mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true });
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
                saveComplete();
            }
        });
    }
    res.render('pay');
});

function saveComplete(){
    mongoose.disconnect();
}
 module.exports = router;