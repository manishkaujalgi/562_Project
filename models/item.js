var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    imageRoute: {type: String, required: true},
    item_title: {type: String, required: true},
    item_detail: {type: String, required: true},
    item_price: {type: Number, required: true}
});

module.exports = mongoose.model('Item', schema);