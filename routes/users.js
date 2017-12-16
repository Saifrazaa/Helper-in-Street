var express = require('express');
var router = express.Router();

var passport=require("passport").LocalStrategy;
var expressValidator=require("express-validator");
var passport=require("passport");
var bodyparser=require("body-parser");
var bcrypt=require("bcrypt");
var User=require('../models/usermodel');
var AuthCtrl = require('../controllers/authCtrl');
//router.use(passport.initialized);

//require passport local strategy
var LocalStrategy=require("passport-local").Strategy;

router.use(expressValidator());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//middleware
router.post('/signup', AuthCtrl.signup);
// router.post('/signup',function(req,res){

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
