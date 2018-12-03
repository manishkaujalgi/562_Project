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
    req.checkBody('email', 'Enter a valid Email id').isEmail();
    if (req.validationErrors()){
        return result(null, false, {message: 'Please enter a valid Email id'});
    }
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

passport.use('local.login', new BasicStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, result){
    req.checkBody('email', 'Enter a valid Email id').isEmail();
    if (req.validationErrors()){
        return result(null, false, {message: 'Please enter a valid Email id'});
    }
    Customer.findOne({'user_email': email}, function(err, user){
        if(err)
            return result(err);

        if(!user)
            return result(null, false, {message: 'Email is not registered. Please register'});
        
        if(user){
            
            Customer.findOne({'user_password': password}, function(err, pass){

                if(err)
                    return result(err);

                if(!pass)
                    return result(null, false, {message: 'Incorrect Password | Try again'});
                               
                return result(null, user);    
            
        
            });
        }

    });

}
));