var express = require('express');
var router = express.Router();

var passport=require("passport").LocalStrategy;
var expressValidator=require("express-validator");
var passport=require("passport");
var bodyparser=require("body-parser");
var bcrypt=require("bcrypt");
var User=require('../models/usermodel');
var AuthCtrl = require('../controllers/authCtrl');
var multer=require("multer");
var uploads=multer({dest:"public/uploads/"});

//load the config file of passport
var passportconfig=require("../config/passport");


//require passport local strategy
var LocalStrategy=require("passport-local").Strategy;

router.use(expressValidator());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//middleware
router.post('/signup',uploads.single("picture"),function(req,res,next){
  var username=req.body.username;
  var email=req.body.email;
  var city=req.body.city;
  var country=req.body.country;
       var contact=req.body.contact;
        var address=req.body.address;
        var password=req.body.password;
        var type=req.body.type;
        var cpassword=req.body.cpassword;
        var description=req.body.description;

        var profilephoto=req.file.filename;
        console.log(req.body);
        req.checkBody("email","Please Enter A Valid Email Address").isEmail();
        req.checkBody('password',"Your Password Length Should be greater than 8 charachters").isLength({ min: 8 });
        req.checkBody("cpassword","Your Password Does not Match").equals(req.body.password);
        req.checkBody("description","Your Description field should be greater than 50 characters").isLength({min:30});


  var errors=req.validationErrors();
  if(errors){
    res.render("registration",{title:"Registration",errors:errors,emailexists:req.session.emailexists});
  }
  else {

      //pass the user data to the User model
      var newuser=new User({
       username:username,
       password:password,
       email:email,
       photo:profilephoto,
       address:address,
       contactno:contact,
       city:city,
       country:country,
       type:type,
       description:description

     });
     var checkemail=User.findOne({'email':newuser.email},function(err,user){
       if(user){
         res.render("registration",{title:"Register Here",emailexists:"Email Address Already Exists"});
       }
       else {
         var userregister=User.createuser(newuser,function(err,user){
           if (err) throw err;
           console.log("User Registered");
           req.login(user,function(err){
             if (err) throw err;
             res.redirect("/");
           })

       });
       }
     })



    }
});

module.exports = router;
