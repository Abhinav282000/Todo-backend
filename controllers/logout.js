const UserDetails=require("../models/UserDetails")
const logout=async(req,res)=>{
  const authHeader = req.headers['authorization'];
console.log(authHeader);
  if(authHeader){
    
      const token=req.headers.authorization.split(' ')[1]
      console.log(token);
      if(!token){
          res.status(401).json({success:false,message:'Authorization not valid'})
      }
      const tokens=req.user.tokens;
      const newTokens=tokens.filter(t=>t.token!==token);
      await UserDetails.findByIdAndUpdate(req.user._id,{tokens:newTokens})
      res.json({success:true,message:'Sign out successfully'});
  }
}
module.exports=logout;