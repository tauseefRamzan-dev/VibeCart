const express=require("express")
const router=express.Router();
const Products=require("../models/products")
const {verifyUser}=require("../middlewares/auth")
const {getRandomId,isAdmin, generateProductId}=require("../utils/global")
const cloudinary=require("../config/cloudinary")
const multer=require("multer")
const storage=multer.memoryStorage()
const upload=multer({storage})

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "vibeCart/products/images" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(fileBuffer);
  });
};
router.post("/add",verifyUser,upload.single("image"),async(req,res)=>{
    try{
      if(req.user.role==="admin" || req.user.role==="superAdmin")
      {
        const {title,description,price,category,stockQuantity}=req.body;
        const file=req.file;
        if(!title || !description || price===undefined || !category || stockQuantity===undefined || !file){
    return res.status(400).json({message: "All fields are required", isError: true})
}
    if(title.length<2){
        return res.status(400).json({message: "Product title is not correct", isError: true})
      }
      if (isNaN(price) || Number(price) < 0) {
        return res.status(400).json({ 
          message: "Please enter a valid price", 
          isError: true 
        });
      }
      
      const existingProduct = await Products.findOne({
        title: title.trim(),
        description: description,
        price: price
      });
      
      if (existingProduct) {
        return res.status(400).json({
          message: "This product already exists in the inventory.",
          isError: true
        });
      }


const result=await uploadToCloudinary(file.buffer)

// Optimize Cloudinary URL by adding f_auto,q_auto for fast image loading in WebP/AVIF format
const optimizedImageUrl = result.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');

      const id=generateProductId(category)
      const productData={id,title,description,price,category,stockQuantity, image: {
        url: optimizedImageUrl,
        publicId: result.public_id
      }}
      console.log(productData)
      const Product=new Products(productData)
      await Product.save();
      
      return res.status(201).json({message: "A new product has been successfuly added.", isError: false, Product})
    }
    else{
      return res.status(403).json({message: "Forbidden", isError: true })
    }
    }catch(error){
      console.error("Error saving product:", error.message)
      return res.status(500).json({message: "Internal Server Error", isError: true})
    }
    
    
  })


  router.patch("/update",verifyUser,upload.single("image"),async(req,res)=>{
    
try{
  const productID=req.query.id
      if(req.user.role==="admin" || req.user.role==="superAdmin")
      {
        const {title,description,price,category,stockQuantity}=req.body;
        const file=req.file;
  
const existingProduct = await Products.findOne({ id: productID });
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found", isError: true });
      }

let imageData = existingProduct.image;

      if (file) {
        if (existingProduct.image?.publicId) {
          await cloudinary.uploader.destroy(existingProduct.image.publicId);
        }
        const result = await uploadToCloudinary(file.buffer);

        // Optimize Cloudinary URL by adding f_auto,q_auto for fast image loading in WebP/AVIF format
const optimizedImageUrl = result.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');

        imageData = {
          url: optimizedImageUrl,
          publicId: result.public_id
        };
      }


     const updateProductData = {
        title: title || existingProduct.title,
        description: description || existingProduct.description,
        price: price !== undefined ? price : existingProduct.price,
        category: category || existingProduct.category,
        stockQuantity: stockQuantity !== undefined ? stockQuantity : existingProduct.stockQuantity,
        image: imageData
      };

      console.log(updateProductData)
      const productUpdated = await Products.findOneAndUpdate(
        { id: productID },
        updateProductData,
        { new: true }
      );
      
      return res.status(200).json({message: "A  product has been successfuly updated.",productUpdated ,isError: false})
    }
    else{
      return res.status(403).json({message: "Forbidden", isError: true })
    }
    }catch(error){
      console.error("Error updating product:", error.message)
      return res.status(500).json({message: "Product not updated. Internal Server Error", isError: true})
    }
    
    
  })
  router.delete("/delete",verifyUser,async(req,res)=>{
    try{
      if(req.user.role==="admin" || req.user.role==="superAdmin")
        {
           let productID=req.query.id

        const existingProduct = await Products.findOne({ id: productID });
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found", isError: true });
      }

let imageData = existingProduct.image;

if (imageData) {
        if (existingProduct.image?.publicId) {
          await cloudinary.uploader.destroy(existingProduct.image.publicId);
        }
      }


         const deletedProduct=await Products.findOneAndDelete({id:productID} )
         if(!deletedProduct){
          return res.status(404).json({message: "Product not found" , isError: true})
         }
          return res.status(200).json({message: "A product has been sucessfully deleted", isError: false, deletedProduct})
        }else{
          return res.status(403).json({message: "Forbidden", isError: true})
        }
      }catch(error){
          console.error("error",error)
          return res.status(500).json({message: "Product not deleted. Internal Server Error", isError: true})
      }

    
  })

  router.get("/all",async(req,res)=>{
     try{
           
                 const products=await Products.find({}).sort({ createdAt: -1 });
                 if(products.length===0){
                  return res.status(404).json({message:"Products not found", isError: true} )
                 }

                 return res.status(200).json({message: "Products fetched sucessfully", products,isError: false})
          
     }catch(error)
     {
         console.error("error",error)
         return res.status(500).json({message: "Products not fetched. Internal Server Error",isError: true})
     }
  })


  router.get("/single",async(req,res)=>{
     try{
            const productID=req.query.id;
                 const product=await Products.findOne({id:productID})
                 if(!product){
                  return res.status(404).json({message:"Product not found", isError: true} )
                 }

                 return res.status(200).json({message: "Product fetched sucessfully", product,isError: false})
           
     }catch(error)
     {
         console.error("error",error)
         return res.status(500).json({message: "Product not fetched. Internal Server Error",isError: true})
     }
  })

   router.get("/category",async(req,res)=>{
     try{
           const {category}=req.query
                 const products=await Products.find({category})
                 if(products.length===0){
                  return res.status(404).json({message:"Products not found", isError: true} )
                 }

                 return res.status(200).json({message: "Products fetched sucessfully", products,isError: false})
          
     }catch(error)
     {
         console.error("error",error)
         return res.status(500).json({message: "Products not fetched. Internal Server Error",isError: true})
     }
  })

  // router.post("/whishlist")

module.exports=router