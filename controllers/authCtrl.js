var User=require("../models/usermodel");
var AuthCtrl = {
  signup:function(req,res,next){
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
     }}

  }



module.exports = AuthCtrl;
