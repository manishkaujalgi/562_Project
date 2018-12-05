var express = require('express');
var router = express.Router();
var Item = require('../models/item');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true });
let db = mongoose.connection;

let mongoSchema = mongoose.Schema;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { 


router.get('/', (req,resp) => {
    
    Item.getItems(function(err, items){
    
        if(err){
            throw err;
        }
        //resp.status(200);
        resp.render('adminWelcome', { items: items})
        
        //console.log('Admins Bro');
            
    });
        
} );

router.get('/items/:_id/delete', (req,resp) => {
    var id = req.params._id;
    console.log("In delete");
    Item.deleteItem(id, function(err, items){
    
        if(err){
            throw err;
        }
        resp.redirect('/admin')
             
        console.log(200);
    });
} )


router.get('/items/addItem', (req, resp) => {
    resp.render('addItem-form', { title: "Add New Item", book: {} })
});

router.get('/items/:_id', (req,resp) => {

    Item.getItemsById(req.params._id, function(err, items){

        if(err){
            console.log(err)
            resp.render('error', {})
        }
        console.log({ item: items});
        resp.render('review-detail', { item: items});
        
    });
} )


router.post('/items/addItem', (req,resp) => {
    var item = req.body;
    console.log(req.body);
    Item.addItem(item, function(err, items){

        if(err){
            console.log(err);
            resp.render('addItem-form', { item: item, error: err} )
        }
        resp.redirect('/admin/items/' + items.id)
        console.log(200);
    });
} )

router.get('/items/:_id/update', (req,resp) => {

    Item.getItemsById(req.params._id, function(err, items){

        if(err){
            console.log(err)
            resp.render('error', {})
        }
        resp.render('editItem-form', { title: "Update Item", item: items})
        console.log(200);
    });
} )

router.post('/items/:_id/update', (req,resp) => {

    var id = req.params._id;
    var item = req.body;
    Item.updateItem(id, item, {new:true}, function(err, items){

        if(err){
            console.log(err);
            resp.render('addItem-form', { item: item, error: err} )
        }
        
        resp.redirect('/admin/items/' + items.id)
        //console.log(204);
});

router.post('/items/:_id/delete', (req,resp) => {
    var id = req.params._id;
    console.log("In delete");
    Item.deleteItem(id, function(err, items){
    
        if(err){
            throw err;
        }
        resp.redirect('/admin')
             
        console.log(200);
    });
} );

router.get('/login', (req, resp) => {
    console.log('Admin');
    resp.render('adminLogin');

});
    

} )









});



module.exports = router;