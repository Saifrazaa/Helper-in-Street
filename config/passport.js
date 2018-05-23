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
passport.use("local.signin",new LocalStrategy({
  usernameField:"email",
  passwordField:"password",
  passReqToCallback:true
},
  function(req,email, password, done) {

    User.findOne({ 'email': email }, function (err, user) {
      if (err) {return done(err); }
      if (!user)
      {
          console.log("User not found");
        req.session.flash="User not found";

         return done(null, false,{message:"User not found"});
       }


       if(!user.validPassword(password)){
          console.log("Password do not match");
          req.session.flash="Password do not match";
         return done(null,false,{message:"Password not match"});
       }
       
       return done(null,user);


    });
  }
));
