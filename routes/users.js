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
     req.checkBody("username","Username should not be empty").notEmpty();
     req.checkBody("email","email should not be empty").notEmpty();
     req.checkBody("city","city should not be empty").notEmpty();
     req.checkBody("address","address should not be empty").notEmpty();
     req.checkBody("country","country should not be empty").notEmpty();
     req.checkBody("contact","contact should not be empty").notEmpty();
     var errors=req.validationErrors();
     console.log(errors);
     if(errors)
     {
       res.redirect("/registration");
     }
     else {
       res.redirect("/");
     }

});

module.exports = router;
