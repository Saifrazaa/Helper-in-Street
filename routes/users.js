var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup',function(req,res){
 res.send("all the data is submitted");
})

module.exports = router;
