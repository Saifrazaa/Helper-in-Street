var express=require("express");
var app=express();
var mongoose=require('mongoose');
mongoose.connect("mongodb://saifraza:saifraza308@ds135486.mlab.com:35486/workerinstreet");

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
  newuser.save(callback);
}
