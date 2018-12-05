var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
    
    imageRoute: {type: String, required: true},
    item_title: {type: String, required: true},
    item_detail: {type: String, required: true},
    item_price: {type: Number, required: true}

    
});