const { default: mongoose } = require("mongoose");


const userSchema=mongoose.Schema({
    email:String, 
    password:String,
    name:String, 
    dob:String
},{timeStamps:true})


module.exports=mongoose.model("user",userSchema);