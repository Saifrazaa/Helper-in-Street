var express=require("express");
var app=express();
var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/users");
var bcrypt=require("bcrypt");

var userschemas=module.exports=new mongoose.Schema({
  username:{
      type:String
  },
  password:{
      type:String,
      hash:true
  },
  email:{
      type:String
  },
  address:{
      type:String
  },
  contactno:{
      type:String
  },
  city:{
      type:String
  },
  country:{
      type:String
  }
});
var User=module.exports=mongoose.model("Users",userschemas);
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
