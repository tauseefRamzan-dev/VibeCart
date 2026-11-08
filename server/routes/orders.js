const express=require("express")
const router=express.Router();
const Orders=require("../models/orders")
const {getRandomId, generateOrderId}=require("../utils/global");
const { verifyUser } = require("../middlewares/auth");
const products = require("../models/products");
router.post("/create",verifyUser,async(req,res)=>{
    try{

        const {uid}=req.user
        const {orderItems,shippingAddress,subtotal,totalAmount,status,user}=req.body
        
        if(orderItems.length===0 || !shippingAddress||!subtotal||!totalAmount)
            {
                return res.status(400).json({message: "Invalid Data", isError: true})
            }
            const orderID=generateOrderId();
            const orderData={uid: uid,orderID,user,orderItems,shippingAddress,subtotal,totalAmount,status: status || "pending",isPaid:false}
            
            // const existingOrder=await Orders.findOne({uid: uid,user,status: "pending",totalAmount: totalAmount})
            const existingOrder = await Orders.findOne({ 
            uid, 
            status: "pending", 
            totalAmount,
            createdAt: { $gte: new Date(Date.now() - 60 * 1000) }
        });
            if(existingOrder)
                {
                    return res.status(400).json({ message: 'This oder has been already placed.', isError: true });
                }
                
                const order=new Orders(orderData);
               await order.save();
               for (const item of orderItems) {
            await products.findOneAndUpdate(
                { id: item.id },
                { $inc: { stockQuantity: -item.quantity } }
            );
        }

               req.app.get("io")?.to("admins").emit("order:created", order.toObject());
                
                return res.status(201).json({message: "Your order has been sucessfully placed", order,isError: false})
                
                
            }catch(error)
            {
                console.error("error",error)
                return res.status(500).json({message: "Order not placed. Internal Server Error",isError: true})
            }

})

router.get("/all",verifyUser,async(req,res)=>{
     try{
           if(req.user.role==="admin" || req.user.role==="superAdmin")
           {
                 const orders=await Orders.find({}).sort({ createdAt: -1 });
                 if(orders.length===0){
                  return res.status(404).json({message:"Orders not found", isError: true} )
                 }

                 return res.status(200).json({message: "Orders fetched sucessfully", orders,isError: false})
           }else{
            return res.status(403).json({message: "Forbidden", isError: true})
           }
     }catch(error)
     {
         console.error("error",error)
         return res.status(500).json({message: "Orders not fetched. Internal Server Error",isError: true})
     }
  })

router.get("/my-orders",verifyUser,async(req,res)=>{
     try{
           const {uid}=req.user;

                 const orders=await Orders.find({uid}).sort({ createdAt: -1 });
                 if(orders.length===0){
                  return res.status(404).json({message:"Orders not found", isError: true} )
                 }
                 return res.status(200).json({message: "Orders fetched sucessfully", orders,isError: false})
     }catch(error)
     {
         console.error("error",error)
         return res.status(500).json({message: "Orders not fetched. Internal Server Error",isError: true})
     }
  })

    router.delete("/delete",verifyUser,async(req,res)=>{
      try{
        if(req.user.role==="admin" || req.user.role==="superAdmin")
          {
             let orderID=req.query.id
  
          const existingOrder = await Orders.findOne({ orderID });
        if (!existingOrder) {
          return res.status(404).json({ message: "Order not found", isError: true });
        }
  
  
           const deletedProduct=await Orders.findOneAndDelete({orderID} )
           if(!deletedProduct){
            return res.status(404).json({message: "Order not found" , isError: true})
           }

           req.app.get("io")?.to("admins").emit("order:deleted", { orderID: deletedProduct.orderID });
            req.app.get("io")?.to(`user:${deletedProduct.uid}`).emit("order:deleted", { orderID: deletedProduct.orderID });

            return res.status(200).json({message: "A order has been sucessfully deleted", isError: false, deletedProduct})
          }else{
            return res.status(403).json({message: "Forbidden", isError: true})
          }
        }catch(error){
            console.error("error",error)
            return res.status(500).json({message: "Order not deleted. Internal Server Error", isError: true})
        }
  
      
    })

router.patch("/order/:id/status-update",verifyUser,async(req,res)=>{ 
    try{
    if(req.user.role==="admin" || req.user.role==="superAdmin")
    {

        const orderID=req.params.id;
        let {status}=req.body;
        if (!status) {
            return res.status(400).json({ message: "Status is required", isError: true });
        }
        
        status = status.toLowerCase();
        
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: `Invalid status`,
                isError: true,
            });
        }
        const orderUpdated=await Orders.findOneAndUpdate({orderID}, {status: status},  {returnDocument: 'after',runValidators: true} )
        if(!orderUpdated){
            return res.status(404).json({message:"Orders not found", isError: true} )
        }

         req.app.get("io")?.to(`user:${orderUpdated.uid}`).emit("order:status-updated", orderUpdated.toObject());
        req.app.get("io")?.to("admins").emit("order:status-updated", orderUpdated.toObject());
        
        return res.status(200).json({message: "Orders updated sucessfully", orderUpdated,isError: false})
    }else{
        return res.status(403).json({message: "Forbidden", isError:true})
    }
     }catch(error)
     {
         console.error("error",error)
         return res.status(500).json({message: "Orders not updated. Internal Server Error",isError: true})
     }
  })

router.patch('/order/:id/payment-update', verifyUser, async (req, res) => {
  try {
    if(req.user.role==="admin" || req.user.role==="superAdmin")
    {
        const {isPaid}=req.body; 
        const order = await Orders.findOneAndUpdate(
            { orderID: req.params.id },
            { isPaid, paidAt: isPaid ? new Date() : null },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json({ message: "Payment status updated successfully", order });

         req.app.get("io")?.to(`user:${order.uid}`).emit("order:payment-updated", order.toObject());
        req.app.get("io")?.to("admins").emit("order:payment-updated", order.toObject());
    }else{
        return res.status(403).json({message: "Forbidden", isError:true})
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
});




module.exports=router;