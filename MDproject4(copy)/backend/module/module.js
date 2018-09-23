const mongoose=require("mongoose");

const productschema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String, required:true},
    email:{type:String, required:true},
    branch:{type:String, required:true},
    tech:{type:String, required:true},
    productImage: { type:String }
  
});

module.exports=mongoose.model('Product',productschema);