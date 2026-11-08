const express=require("express")
const router=express.Router()
const Users=require("../models/auth")
const  Products=require("../models/products")
const  Orders=require("../models/orders")
const {verifyUser}=require("../middlewares/auth")
router.get("/dashboard-stats", verifyUser, async (req, res) => {
    if(req.user.role==="admin" || req.user.role==="superAdmin")
  try {
    // Teeno/Charo models se parallelly count lena
    const [totalUsers, totalCustomers,totalAdmins, totalProducts, totalOrders] = await Promise.all([
      Users.countDocuments({}),                       
      Users.countDocuments({ role: "customer" }), 
      Users.countDocuments({ role: { $in: ["admin", "superAdmin"] } }),
      Products.countDocuments({}),
      Orders.countDocuments({})                       
    ]);

    return res.status(200).json({
      isError: false,
      message: "Dashboard stats fetched successfully",
      stats: {
        totalUsers,
        totalCustomers,
        totalAdmins,
        totalProducts,
        totalOrders
      }
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return res.status(500).json({
      isError: true,
      message: "Internal server error"
    });
  }
});

module.exports=router