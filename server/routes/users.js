const express=require("express");
const { verifyUser } = require("../middlewares/auth");
const Users=require("../models/auth")
const router=express.Router();


router.get("/all",verifyUser,async(req,res)=>{
     try{
           if(req.user.role==="admin" || req.user.role==="superAdmin")
           {
                 const users=await Users.find({}).select("-password")
                 if(users.length===0){
                  return res.status(404).json({message:"Users not found", isError: true} )
                 }

                 return res.status(200).json({message: "Users fetched successfully", users,isError: false})
           }else{
            return res.status(403).json({message: "Forbidden", isError: true})
           }
     }catch(error)
     {
         console.error("error",error)
         return res.status(500).json({message: "Users not fetched. Internal Server Error",isError: true})
     }
  })

  router.get("/single-user",verifyUser,async(req,res)=>{
       try{
             if(req.user.role==="admin" || req.user.role==="superAdmin")
             {
              const uid=req.query.uid;
                   const user=await Users.findOne({uid}).select("-password")
                   if(!user){
                    return res.status(404).json({message:"User not found", isError: true} )
                   }
  
                   return res.status(200).json({message: "User fetched successfully", user,isError: false})
             }else{
              return res.status(403).json({message: "Forbidden", isError: true})
             }
       }catch(error)
       {
           console.error("error",error)
           return res.status(500).json({message: "User not fetched. Internal Server Error",isError: true})
       }
    })
  

    router.get("/customers",verifyUser,async(req,res)=>{
     try{
           if(req.user.role==="admin" || req.user.role==="superAdmin")
           {
                 const customers=await Users.find({role: "customer"}).select("-password")
                 if(customers.length===0){
                  return res.status(404).json({message:"Customers not found", isError: true} )
                 }

                 return res.status(200).json({message: "Customers fetched successfully", customers,isError: false})
           }else{
            return res.status(403).json({message: "Forbidden", isError: true})
           }
     }catch(error)
     {
         console.error("error",error)
         return res.status(500).json({message: "Customers not fetched. Internal Server Error",isError: true})
     }
  })

    router.get("/admins",verifyUser,async(req,res)=>{
     try{
           if(req.user.role==="admin" || req.user.role==="superAdmin")
           {
                 const admins=await Users.find({role: "admin"}).select("-password")
                 if(admins.length===0){
                  return res.status(404).json({message:"Admins not found", isError: true} )
                 }

                 return res.status(200).json({message: "Admins fetched successfully", admins,isError: false})
           }else{
            return res.status(403).json({message: "Forbidden", isError: true})
           }
     }catch(error)
     {
         console.error("error",error)
         return res.status(500).json({message: "Admins not fetched. Internal Server Error",isError: true})
     }
  })

    router.patch("/user/role",verifyUser,async(req,res)=>{
     try{
       const uid=req.query.id
       const {role}=req.body
           if(req.user.role==="superAdmin")
           {
                 const user=await Users.findOneAndUpdate({uid}, {role: role},{returnDocument: 'after',runValidators: true}).select("-password")
                 if(!user){
                  return res.status(404).json({message:"User not found", isError: true} )
                 }

                 return res.status(200).json({message: "User role updated successfully", user,isError: false})
           }else{
            return res.status(403).json({message: "Forbidden", isError: true})
           }
     }catch(error)
     {
         console.error("error",error)
         return res.status(500).json({message: "User role not updated. Internal Server Error",isError: true})
     }
  })

  router.delete("/user/delete",verifyUser,async(req,res)=>{
      try{
        if(req.user.role==="superAdmin")
          {
             let uid=req.query.id
    if (!uid) {
      return res.status(400).json({ message: "User ID is required", isError: true });
    }
    if (uid === req.user.uid) {
      return res.status(400).json({ 
        message: "SuperAdmin cannot delete their own account", 
        isError: true 
      });
    }
  
           const deletedUser=await Users.findOneAndDelete({uid} )
           if(!deletedUser){
            return res.status(404).json({message: "User not found" , isError: true})
           }
            return res.status(200).json({message: "A User has been successfully deleted", isError: false, deletedUser})
          }else{
            return res.status(403).json({message: "Forbidden", isError: true})
          }
        }catch(error){
            console.error("error",error)
            return res.status(500).json({message: "User not deleted. Internal Server Error", isError: true})
        }
  
      
    })
  
  module.exports=router