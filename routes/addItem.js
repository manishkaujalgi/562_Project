var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../routes/schema');
router.get('/additem',(req,res) =>{
    res.render('AddItem');
});

router.post('/additem',(req,res) =>{
console.log(req.body);

mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true});

var itemDet = [ new Item({
    title:req.body.title,
    detail:req.body.detailinfo,
    price:req.body.price,
    imageUrl:req.body.imagelink
})];

console.log("Length: "+itemDet.length);
var count=0;
for(var i=0; i<itemDet.length;i++){
    itemDet[i].save(function(err,result){
        count++;
        console.log("Counter: "+count)
        if(count == itemDet.length ){
            saveComplete();
        }
    });
}
res.render('AddItem');
});

function saveComplete(){
    mongoose.disconnect();
}
module.exports = router;