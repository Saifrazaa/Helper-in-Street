var express=require("express");
var router=express.Router();
router.get("/login",checkauthentication,function(req,res){
  res.send("You are in worker folder");
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
