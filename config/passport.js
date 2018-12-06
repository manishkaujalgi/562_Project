var passport = require('passport');
var Customer = require('../models/customer');
var BasicStrategy = require('passport-local').Strategy;

const nodemailer = require('nodemailer');
var otp = require('../routes/schema');
var mongoose = require('mongoose');

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
                generateOTP(email);   
                return result(null, user);    
            });
        }

    });

}
));

function generateOTP(email){
    console.log(email);
    const rand=Math.floor((Math.random() * 100) + 54);
    var otpDet =[ new otp({
        otp_num: rand
    })];
    let transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'vaishu93.b@gmail.com', // generated ethereal user
                    pass: 'sonicview' // generated ethereal password
                },
                tls:{rejectunauthorized:false}
            });
            // setup email data with unicode symbols
    let mailOptions = {
                from: '"NodeMail Test" <vaishu93.b@gmail.com>', // sender address
                to: email, // list of receivers
                subject: 'Ecommerce Login OTP ', // Subject line
                text: 'Please Enter the below OTP For login Confirmation', // plain text body
                html: "" +"<br><h2>OTP:"+ rand+"</h2>" // html body
    };
            // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                    return console.log(error);
            }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        var count=0;
        //mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true }, function(err,db){
        for(var z = 0; z < otpDet.length; z++ ){
            otpDet[z].save(function(err, result){
            count++;
            console.log(count);
           /*if (count == otpDet.length){
              db.close();
            }*/
        });
        }
    //});
                        }); 
}
function saveComplete(){
    mongoose.disconnect();
}