const express = require('express');
const router = express.Router();
const Wishlist = require("../models/wishlist");
const { verifyUser } = require('../middlewares/auth');

router.get('/user',verifyUser, async (req, res) => {
    try {
        const { userId } = req.user.uid;
        const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
        
        if (!wishlist) {
            return res.status(404).json({message: "Wishlist not found", isError: true });
        }
        
        res.status(200).json({ data: wishlist, isError: false });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", isError: true });
    }
});

// 2. Add Product to Wishlist
router.post('/add', verifyUser,async (req, res) => {
    try {
        const { uid } = req.user;
        const {productId}=req.body;
        let wishlist = await Wishlist.findOne({ user: uid });

        if (!wishlist) {
            // Agar wishlist nahi hai toh nayi bana kar product add kar dein
            wishlist = new Wishlist({
                user: userId,
                products: [productId]
            });
        } else {
            // Agar product pehle se wishlist mein hai ya nahi, wo check karein
            if (wishlist.products.includes(productId)) {
                return res.status(400).json({ message: "Product already in wishlist",isError: true });
            }
            wishlist.products.push(productId);
        }

        await wishlist.save();
        res.status(200).json({ message: "Product added to wishlist", data: wishlist,isError: false });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", isError: true });
    }
});

// 3. Remove Product from Wishlist
router.post('/remove', verifyUser,async (req, res) => {
    try {
        const { userId } = req.body.uid;
        const {productId}=req.body;

        const wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found",isError: true });
        }

        // Product ko array se remove karna ($pull ki tarah ya JS filter se)
        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== productId
        );

        await wishlist.save();
        res.status(200).json({ message: "Product removed from wishlist", data: wishlist,isError: false });
    } catch (error) {
        res.status(500).json({  message: "Internal Server Error", isError: true});
    }
});

module.exports = router;