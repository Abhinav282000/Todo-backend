const UserDetails=require("../models/UserDetails");
const jwt=require("jsonwebtoken");

const userProfile=async(req,res)=>{
    try{
     const authHeader = req.headers['authorization'];
     console.log(authHeader);

  

    const token =authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer token"
    // console.log(token);
    const tokens=req.user.tokens;
    console.log("kgmbgmkgbmgk");
    console.log(tokens);
    const newTokens=tokens.filter(t=>{return (t.token!==token)});
    console.log(newTokens);
   if(newTokens){
const result= jwt.verify(token,process.env.jwt_secret_key);
console.log(result.id);
if(result){
const userprofiledata=await UserDetails.findById({_id:result.id});
if(userprofiledata){

    res.status(201).json({name:userprofiledata.name,email:userprofiledata.email,id:userprofiledata._id})
}
}}
else
{
    return res.status(400).send("User is not logged in")
}
    }catch(error){
        console.log(error);
    }
}
module.exports=userProfile;