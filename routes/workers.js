var express=require("express");
var router=express.Router();
router.get("/dashboard",function(req,res){
  res.render("worker/dashboard",{title:"Workers Dashboard"});

});
function checkauthentication(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else {
    req.flash("message","Please Login To Your I.d First");
    return res.redirect("/login");
  }
}
module.exports=router;
