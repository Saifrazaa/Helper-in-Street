var express=require("express");
var router=express.Router();
var passport=require("passport");
var configpassport=require("../config/passport");
function checkauthentication(req,res,next)
{
  if(req.isAuthenticated()){

     return next();
  }
  else {

    return res.redirect("/login");
  }
}
router.get("/dashboard",checkauthentication,function(req,res,next){
  console.log(req.user);
  res.render("dashboard",{title:req.user.username +" , Profile",gotosite:"Go To Site",user:req.user});

});
router.get("/edit_profile",checkauthentication,function(req,res,next){
  console.log(req.user);
  res.render("edit_profile",{title:"Edit Profile",user:req.user});
})
router.get("/history",checkauthentication,function(req,res,next){
  console.log(req.user);
  res.render("history",{title:"History",user:req.user});
})
router.post("/edit_profile",checkauthentication,function(req,res,next){
  console.log(req.user);
console.log(req.body);
});
router.get("/logout" ,checkauthentication,function(req,res){
  req.flash("message","You are Successfully logout");
  res.render("index",{title:"Worker In Street"});
  req.logout(req.user);
});
router.get("/your_current_location",checkauthentication,function(req,res,next){
  res.render("current_location",{title:"Your current location",user:req.user});
});
router.post("/login",passport.authenticate("local.signin",{successRedirect:"/",failureRedirect:"/login",failureFlash:true}));
module.exports=router;
