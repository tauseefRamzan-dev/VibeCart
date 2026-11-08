const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const {getRandomId,isValidEmail}=require("../utils/global")
const Users=require("../models/auth")
const {verifyUser}=require("../middlewares/auth")
const {JWT_SECRET_KEY}=process.env;
const rateLimit = require("express-rate-limit"); 

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: { 
    message: "Too many login/register attempts from this IP, please try again after 15 minutes.", 
    isError: true 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/register",authLimiter,async(req,res)=>{
  try{

    const {fullName, email,password}=req.body;
    
   if (fullName.length < 3) {
      return res
        .status(400)
        .json({ message: "Full name isn't correct", isError: true });
    }
    if (!isValidEmail(email)) {
      return res
        .status(403)
        .json({ message: "Email address isn't valid", isError: true });
    }
    if (password.length < 6) {
      return res
        .status(403)
        .json({ message: "Password must be minimum 6 chars.", isError: true });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email is already registered.", isError: true });
    }

const uid=getRandomId();
const hashedPassword=await bcrypt.hash(password,10);
const userData={uid,fullName, email,password: hashedPassword};
const user=new Users(userData);

await user.save();
res.status(201).json({message: "A new user has been sucessfully added."})
}catch(error){
console.error("error", error);
    res
      .status(500)
      .json({
        message: "User not registered. Internal Server Error.",
        error,
        isError: true,
      });
}

})

router.post("/login",authLimiter,async(req,res)=>{
  try{

    const {email,password}=req.body;
    
    if (!isValidEmail(email)) {
      return res
        .status(403)
        .json({ message: "Email address isn't valid", isError: true });
    }

const user=await Users.findOne({email})
if(!user){
  return res
        .status(400)
        .json({ message: "Invalid credentials", isError: true });
}
const match=await bcrypt.compare(password,user.password);
if(!match){
  return res
        .status(400)
        .json({ message: "Invalid credentials", isError: true });
}

const token=jwt.sign({uid: user.uid , role: user.role}, JWT_SECRET_KEY, {expiresIn: "1d"})

res.status(200).json({ message: "Login successful", token })
}catch(error){
console.error("error", error);
    res.status(500).json({
        message: "User not sign-in. Internal Server Error.",
        error,
        isError: true,
      });
}
})

router.get("/user",verifyUser,async(req,res)=>{

   try{
          const { uid } = req.user
          console.log('uid', uid)
  
          const user = await Users.findOne({ uid }).select("-password")
          if (!user) { return res.status(404).json({ message: "User not found", isError: true }) }
  
          return res.status(200).json({ message: "User found", user })
  
      } catch (error) {
          console.error("error", error)
          res.status(500).json({ message: "User not found. Internal Server Error.", error, isError: true })
      }


})
module.exports=router;