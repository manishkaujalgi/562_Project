var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var custRegisterSchema = new Schema({
    customer_fn: {type: String, required: true},
    customer_ln: {type: String, required: true},
    customer_dob: {type: String, required: true},
    customer_sex: {type: String, required: true},
    customer_email: {type: String, required: true},
    customer_mobile: {type: String, required: true},
    customer_password: {type: String, required: true}
});

module.exports = mongoose.model('registerCustomer', custRegisterSchema);