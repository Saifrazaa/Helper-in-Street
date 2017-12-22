var express = require('express');
var router = express.Router();
var passportconfig=require("../config/passport");

/* GET home page. */
function checkauthentication(req,res,next){
  if(req.isAuthenticated()){

    req.session.dashboard="Dashbaord";
    console.log("dashboard is passed");
    next();
  }
  else {

  req.session.dashboard=null;
    console.log("dashboard is not passed");
    next();
  }};
router.get('/', checkauthentication,function(req, res, next) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('index', { title: 'Worker In Street',Dashboard:req.session.dashboard,user:req.user });
});
router.get('/services',checkauthentication, function(req, res, next) {
  res.render('services', { title: 'About Us', Dashboard:req.session.dashboard,user:req.user});
});
router.get('/registration',checkauthentication, function(req, res, next) {
  res.render('registration', { title: 'Sign Up ',saif:"saif raza",Dashboard:req.session.dashboard,user:req.user,emailexists:null });
  req.session.errors=null;
});

router.get('/login',checkauthentication ,function(req, res, next) {

  res.render('login', { title: 'Log in To Your Account ' ,Dashboard:req.session.dashboard,user:req.user});
});
router.get('/aboutus', checkauthentication,function(req, res, next) {
  res.render('about', { title: 'About Us' ,Dashboard:req.session.dashboard,user:req.user});
});
router.get('/contactus', checkauthentication,function(req, res, next) {
  res.render('contact', { title: 'Contact Us',Dashboard:req.session.dashboard,user:req.user });
});
router.get("/logout",checkauthentication,function(req,res,next){
  req.logout(req.user,function(err){
    if (err) throw err;
    res.redirect("/");
  });
});


module.exports = router;
