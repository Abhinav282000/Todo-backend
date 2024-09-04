const UserDetails = require("../models/UserDetails");
const jwt=require("jsonwebtoken")
const isAuth=async(req,res,next)=>{
    if(req.headers&&req.headers.authorization){
        const token=req.headers.authorization.split(' ')[1]
        console.log(token);
        try{
            const decode=await jwt.verify(token,process.env.jwt_secret_key);
            console.log(decode.id);
            const user=await UserDetails.findById(decode.id);
            console.log(user);
            if(!user){
                return res.json({success:false,message:'unauthorized access'})
            }
            req.user=user;
            next();
        }catch(error){
            console.log("kmkdmkcmdmk");
            res.status(500).json({error})
        }
    }
}
module.exports=isAuth;