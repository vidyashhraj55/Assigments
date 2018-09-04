const mongoose=require("mongoose");

const userschema=mongoose.Schema({
    name:String,
    age:Number

});
module.exports=mongoose.model('user',userschema);