var passport=require("passport");
var User=require("../models/usermodel");
var LocalStrategy=require("passport-local").Strategy;
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
passport.use("local.signin",new LocalStrategy(
  function(username, password, done) {

    User.findOne({ 'email': username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        
         return done(null, false);
       }
       if(!user.validPassword(password)){

         return done(null,false,{message:"Invalid Password"})
       }

       return done(null,user);


    });
  }
));
