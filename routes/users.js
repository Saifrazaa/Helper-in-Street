var express = require('express');
var router = express.Router();
var User=require('../models/usermodel');
var passport=require("passport").LocalStrategy;
var expressValidator=require("express-validator");

var bodyparser=require("body-parser");
//router.use(passport.initialized);

router.use(expressValidator());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',function(req,res){
 var username=req.body.username;
  var email=req.body.email;
  var city=req.body.city;
   var country=req.body.country;
    var contact=req.body.contact;
     var address=req.body.address;
     var password=req.body.password;
     var cpassword=req.body.cpassword;
     console.log(req.body.username);

     req.checkBody("email","email should be valid").isEmail();
     req.checkBody("cpassword","Please Confirm Your Password").equals(req.body.cpassword);
     var errors = req.validationErrors();
     if(errors)
     {
		//You need to re-render template with error variables
		/*res.render('registration',{
            errors : errors
        });*/
        res.redirect("/registration");
        console.log(req.body);
        console.log('Error');
    }else
    {
    var newuser= new User({
        username:username,
        password:password,
        email:email,
        address:address,
        contactno:contact,
        city:city,
        country:country
    });
    var userregister=User.createuser(newuser,function(err,user){
      if (err) throw err;
      console.log("User Registered");
    });

    }




});
router.post('/login',function(req,res){
  var username=req.body.username;
  var password=req.body.password;


})

module.exports = router;
