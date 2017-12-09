var express = require('express');
var router = express.Router();

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
     var errors=req.ValidationErrors();
     if(errors)
     {
     	res.render("registration",{errors:errors})
     }
     else
     {
     	return redirect("/");
     }

});

module.exports = router;
