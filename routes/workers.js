var express = require("express");
var router = express.Router();
var passport = require("passport");
var axios = require("axios");
var configpassport = require("../config/passport");
var User = require("../models/usermodel");
function checkauthentication(req, res, next) {
  if (req.isAuthenticated()) {

    return next();
  }
  else {

    return res.redirect("/login");
    req.flash("notloggedin", "You first need to login to your account");
  }
}
router.get("/dashboard", checkauthentication, function (req, res, next) {
  res.render("dashboard", { title: req.user.username + " , Profile", gotosite: "Go To Site", user: req.user });

});
router.get("/edit_profile", checkauthentication, function (req, res, next) {
  res.render("edit_profile", { title: req.user.username + " ,Edit Profile", user: req.user });
})
router.get("/history", checkauthentication, function (req, res, next) {
  res.render("history", { title: req.user.username + " ,History", user: req.user });
})
router.post("/edit_profile", checkauthentication, function (req, res, next) {
});
router.get("/logout", checkauthentication, function (req, res) {
  req.flash("message", "You are Successfully logout");
  res.render("index", { title: "Worker In Street" });
  req.logout(req.user);
});
router.get("/your_current_location", checkauthentication, function (req, res, next) {
  res.render("current_location", { title: "Your current location", user: req.user });
});
router.post("/login", passport.authenticate("local.signin", { successRedirect: "/", failureRedirect: "/login", failureFlash: true }));
router.post("/search", function (req, res) {
  var type = req.body.search;
  var latlong = req.body.latlng;
  axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlong + "&key=AIzaSyC4J4w5E2LA2QA3Ngtmv3iVwfAlpXx4v0E").
    then(function (response) {
      var full_address = response.data.results[3].formatted_address;
      User.find({ "full_address": full_address, "type": type }, function (err, user) {
        if (err) throw err;
        if (user.length > 0) {
          console.log(user)
          res.render("search_result", { title: type, search_result: user })
        }
        if (user.length == 0) {
          res.render("search_result", { title: type, error: "Your Desired Worker Is Not Available Around You" })
        }
      })
    }).
    catch(function (error) {
    })
})

module.exports = router;
