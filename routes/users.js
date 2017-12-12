var express = require('express');
var router = express.Router();
var User=require('../models/usermodel');
var expressValidator=require("express-validator");
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
        console.log('Error');
    }
    else{
      console.log(req.body);
      var newuser=new User({
        username:username,
        email:email,
        password:password,
        contactno:contact,
        city:city,
        country:country,
        address:address
      });
      User.createuser(newuser,function(err,user){
        if(err){ throw err;}
        else { res.redirect('/');}
      })
    }


},function(req,res){


});

module.exports = router;
