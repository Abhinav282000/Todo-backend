const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const signup=require("./controllers/Signup");
const signout=require("./controllers/logout");
const signin=require("./controllers/Signin");
const isAuth=require("./middlewares/auth")
const userProfile=require("./controllers/UserProfile");
const bodyParser = require("body-parser");
const cors=require("cors");
const app=express();
const PORT=process.env.PORT||3000;
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
app.post("/signup",(req,res)=>{
    signup(req,res);
})
app.post("/signin",(req,res)=>{
    signin(req,res);
})
app.get("/profile",isAuth,
    userProfile
)
app.post("/logout",isAuth,
    signout
)
app.get("/hi",()=>{console.log("hfddfi")});
mongoose.connect(('mongodb://localhost:27017/todoapp'));
console.log("database connected");
// app.use(bodyParser.json());
app.listen(PORT,()=>{ console.log(`Server running on port ${PORT}`)})