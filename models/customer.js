var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    user_email: {type: String, required: true},
    user_password: {type: String, required: true}
});

customerSchema.methods.validPassword = function(user_password){
    return compare(user_password, this.user_password);
};

module.exports = mongoose.model('Customer', customerSchema);