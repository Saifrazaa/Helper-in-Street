var express = require('express');
var router = express.Router();
var User=require('../models/usermodel');
var expressValidator=require("express-validator");
var mongoose=require("mongoose");
mongoose.connect("mongodb://saifraza:saifraza308@ds135486.mlab.com:35486/workerinstreet");
var bodyparser=require("body-parser");

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
     req.checkBody("username","Username should not be empty").notEmpty();
     req.checkBody("email","email should be valid").notEmpty().isEmail();
     req.checkBody("city","city should not be empty").notEmpty();
     req.checkBody("address","address should not be empty").notEmpty();
     req.checkBody("country","country should not be empty").notEmpty();
     req.checkBody("contact","contact should not be empty").notEmpty();
     req.checkBody("password","Password field should not be empty").notEmpty();
     req.checkBody("cpassword","Please Confirm Your Password").notEmpty().equals(req.body.cpassword);
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
    
    var Userschema=new mongoose.Schema({
        username:{
            type:String
        },
        password:{
            type:String,
            hash:true
        },
        email:{
            type:String
        },
        address:{
            type:String
        },
        contactno:{
            type:String
        },
        city:{
            type:String
        },
        country:{
            type:String
        }
    });
    var User=mongoose.model("Rameen",Userschema);
    var newuser=User({
        username:username,
        password:password,
        email:email,
        address:address,
        contactno:contact,
        city:city,
        country:country
    }).save(function(err,user){
        if(err) throw err;
    });
    if(newuser)
    {
        console.log("user registered");
    }
    else
    {
        console.log("Error");
    }

    }
   
    


},function(req,res){


});

module.exports = router;
