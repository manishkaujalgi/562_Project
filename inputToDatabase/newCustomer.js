var registerCustomer = require('../models/custRegistration');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/customerInfo', { useNewUrlParser: true });

var count=0;
var registeredCustomers = [
    new registerCustomer({
        customer_fn: 'Manish',
        customer_ln: 'Kaujalgi',
        customer_dob: '09/16/1993',
        customer_sex: 'Male',
        customer_email: 'manishkaujalgi@gmail.com',
        customer_mobile: '3128237889',
        customer_password: 'manish'
    }),

    new registerCustomer({
        customer_fn: 'Vaishnavi',
        customer_ln: 'Bhadresh',
        customer_dob: '05/23/1993',
        customer_sex: 'Female',
        customer_email: 'vaishnavi.bhadresh@gmail.com',
        customer_mobile: '3128567889',
        customer_password: 'vaishnavi'
    }),

    new registerCustomer({
        customer_fn: 'Inchara',
        customer_ln: 'Desai',
        customer_dob: '08/26/1994',
        customer_sex: 'Female',
        customer_email: 'id@gmail.com',
        customer_mobile: '3186237889',
        customer_password: 'inchara'
    }),

    new registerCustomer({
        customer_fn: 'Soumya',
        customer_ln: 'Sreedhar',
        customer_dob: '10/04/1993',
        customer_sex: 'Female',
        customer_email: 'ss@gmail.com',
        customer_mobile: '3128238889',
        customer_password: 'soumya'
    })

];

for(var z = 0; z < registeredCustomers.length; z++ ){

    registeredCustomers[z].save(function(err, result){
        count++;
        if (count == registeredCustomers.length)
            saveComplete();
    });

}

function saveComplete(){
    mongoose.disconnect();
}