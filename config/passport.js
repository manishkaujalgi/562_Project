var passport = require('passport');
var Customer = require('../models/customer');
var BasicStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, result){
    result(null, user.id);

});


passport.deserializeUser(function(id, result){
    Customer.findById(id, function(err, user){
        result(err, user);
    })
});

passport.use('local.register', new BasicStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, result){
    Customer.findOne({'user_email': email}, function(err, user){

        if(user)
            return result(null, false, {message: 'Email is already registered. Please Login'});
        
        if(err)
            return result(err);

        var newCustomer = new Customer();
        newCustomer.user_email = email;
        newCustomer.user_password = password;
        newCustomer.save(function(err, test){
            
            if(err)
                return result(err);
            
            return result(null, newCustomer, {message: 'Email registered successfully'});
        });

    });

}));