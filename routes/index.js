var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'About Us' });
});
router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Contact Us',errors:null });
});
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
