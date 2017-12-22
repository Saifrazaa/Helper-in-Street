var express=require("express");
var app=express();
var mongoose=require("mongoose");
//db configuration file in config folder for databse connection
var db=require("../config/db");
var bcrypt=require("bcrypt");
//create user schema in database
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
  },
  photo:{
    type:String

  },
  type:{
    type:String
  },
  description:{
    type:String
  }
});
userschemas.methods.validPassword=function(password){
return bcrypt.compareSync(password,this.password);
}
var User=module.exports=mongoose.model("User",userschemas);

module.exports.createuser=function(newuser,callback){
  bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash(newuser.password,salt,function(err,hash){
      if(err) throw err;
      newuser.password=hash;
      newuser.save(callback);
    })
  })

}
