const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")
const userdetails= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    tokens:[{
        type:Object
    }]
});
userdetails.methods.comparePassword=function(candidatePassword){
    return bcrypt.compare(candidatePassword,this.password);
}
userdetails.methods.generateToken=function(){
    return jwt.sign({id:this._id,email:this.email},process.env.jwt_secret_key,{expiresIn:'1h'});
}
const UserDetails=mongoose.model("UserDetails",userdetails);
module.exports= UserDetails;