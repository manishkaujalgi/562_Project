var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var resultArray=[];
var Item = require('../routes/schema');
var obj={};
/*router.get('/home', (req,res) =>{
    mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true},
    function(err,db){
        var collection= db.collection('items');
        collection.find().toArray(function(err,payitems){
       if(err) throw err;
        console.log("Pay Length: "+payitems.length);
        resultArray.push(payitems);
        for(var i in resultArray){
            console.log("Resukt : "+resultArray[i])
            for(var res in resultArray[i]){
                console.log(res);
                console.log(resultArray[i][res]);
                obj=resultArray[i][res];
                console.log("object: "+obj);
        }
       }
    });
    db.close();
    });
    res.render('homePage', {items: resultArray});
});*/

/*router.get('/home',function(callback,limit){
    Item.find(callback).limit(limit);
    limit.render('homePage',{ items:})
});*/
module.exports = router;