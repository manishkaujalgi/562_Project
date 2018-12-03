var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    user_email: {type: String, required: true},
    user_password: {type: String, required: true}
});

module.exports = mongoose.model('Customer', customerSchema);