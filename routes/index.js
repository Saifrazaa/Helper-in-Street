var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('index', { title: 'Worker In Street' });
});
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'About Us' });
});
router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Sign Up ',saif:"saif raza" });
  req.session.errors=null;
});
function checkauthentication(req,res){
  if(req.isAuthenticated()){
    return next();
  }
  else {
    req.flash("message","Please Login To Your I.d First");
    return res.redirect("/login");
  }
}
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Portfolio' });
});
router.get('/aboutus', function(req, res, next) {
  res.render('about', { title: 'About Us' });
});
router.get('/contactus', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

module.exports = router;
