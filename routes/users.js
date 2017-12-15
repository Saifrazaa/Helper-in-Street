var express = require('express');
var router = express.Router();
var User=require('../models/usermodel');
var passport=require("passport").LocalStrategy;
var expressValidator=require("express-validator");
var passport=require("passport");
var bodyparser=require("body-parser");
var bcrypt=require("bcrypt");
//router.use(passport.initialized);
//require passport local strategy
var LocalStrategy=require("passport-local").Strategy;

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

     req.checkBody("email","Please Enter A Valid Email Address").isEmail();
     req.checkBody('password',"Your Password Length Should be greater than 8 charachters").isLength({ min: 8 });
     req.checkBody("cpassword","Your Password Does not Match").equals(req.body.password);
     var errors = req.validationErrors();
     if(errors)
     {
	      res.render("registration",{errors:errors});
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
      req.login(user,function(err){
        if (err) throw err;
        res.redirect("/");
      })
    });
}});
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
passport.use(new LocalStrategy(function(username,password,done){
  User.findOne({username:username},function(err,user){
    if(err) throw err;
    if(!user){
      return done(null,false,{message:"not a user"});
    }
    var compassword=bcrypt.compare(user.password,this.password);
    User.findOne({compassword:password},function(err,isMatch){
      if (err) throw err;
      if(!isMatch)
      {
        return done(null,false,{message:"password do not match"})
      }
      return done(null,user);
    })
  })
}));
router.post('/login',passport.authenticate("local",{successRedirect:"/",failureRedirect:"/login",failureFlash:true}),function(req,res){
  console.log("successfully loged in");

});
module.exports = router;
