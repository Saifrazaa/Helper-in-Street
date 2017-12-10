var express = require('express');
var router = express.Router();
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
     req.check("username","Username should not be empty").notEmpty();
     req.check("email","email should not be empty").notEmpty();
     req.check("city","city should not be empty").notEmpty();
     req.check("address","address should not be empty").notEmpty();
     req.check("country","country should not be empty").notEmpty();
     req.check("contact","contact should not be empty").notEmpty();
     var errors = req.validationErrors();
     if(errors)
     {
		//You need to re-render template with error variables
		res.render('registeration',{
            errors : errors
        });
        console.log('Error');
    }
     

},function(req,res){
	//store values into db
	console.log("Process registration");
});

module.exports = router;
