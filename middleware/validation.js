var ValidationMiddleWare = {
  validateSignup: function(res,req,next){
    next();
    next(error);//reject
    //set flash messages and redirect to signup form
  }
}

module.exports = ValidationMiddleWare;
