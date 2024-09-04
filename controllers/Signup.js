const UserDetails=require("../models/UserDetails");
const bcrypt=require("bcrypt");

const signup=async(req,res)=>{
    const {name,email,password}=req.body;
    console.log(name);
    try{
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser=UserDetails({name,email,password:hashedPassword});
   const content= await newUser.save();
    const token=newUser.generateToken();
  return  res.status(201).json({token,user:{id:newUser._id,email:newUser.email,password:newUser.password}});
    }catch(error){
   return res.status(400).json({error:error.message});
    }
}
module.exports=signup;