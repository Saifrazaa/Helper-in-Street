var mongoose=require('mongoose');
var mongodb=require("mongodb");
var bcrypt=require("bcrypt");
mongoose.connect("mongodb://saifraza:saifraza308@ds135486.mlab.com:35486/workerinstreet");
var workerSchemas=new mongoose.Schema({
  username:{
    type:String
  },
  email:{
    type:String
  },
  password:{
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
    address:{
      type:String
    }
});
var User=module.exports=mongoose.model("User",workerSchemas);
module.exports.createuser=function(newUser,callback){
  bcrypt.genSalt(10,function(err,salt){
    if (err) throw err;
    bcrypt.hash(newUser.password,salt,function(err,hash){
      if(err) throw err;
      newUser.password=hash;
      newUser.save(callback);
    });
  });
}
