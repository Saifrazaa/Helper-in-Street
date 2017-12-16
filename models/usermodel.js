var express=require("express");
var app=express();
var User=require("../config/db");
var bcrypt=require("bcrypt");
module.exports.createuser=function(newuser,callback){
  bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash(newuser.password,salt,function(err,hash){
      if(err) throw err;
      newuser.password=hash;
      newuser.save(callback);
    })
  })

}

module.exports.validpassword=function(password){
  bcrypt.compare(password,this.password);
}
