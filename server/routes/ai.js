// // // const express = require("express");
// // // const router = express.Router();
// // // const Products = require("../models/products");
// // // const Orders = require("../models/orders");
// // // const { generateText } = require("ai");
// // // const { createOpenAI } = require("@ai-sdk/openai");
// // // const jwt = require("jsonwebtoken");

// // // const groq = createOpenAI({
// // //   baseURL: "https://api.groq.com/openai/v1",
// // //   apiKey: process.env.GROQ_API_KEY,
// // // });

// // // router.post("/chat", async (req, res) => {
// // //   try {
// // //     const { messages } = req.body;

// // //     if (!messages || !Array.isArray(messages)) {
// // //       return res.status(400).json({ message: "Invalid messages format", isError: true });
// // //     }

// // //     let userOrders = [];
// // //     let authenticatedUid = null;
// // //     const latestMessage = messages[messages.length - 1]?.content || "";

// // //     // 1. JWT Bearer Token Verification with Field Fallback
// // //     const authHeader = req.headers.authorization;
// // //     if (authHeader && authHeader.startsWith("Bearer ")) {
// // //       try {
// // //         const token = authHeader.split(" ")[1];
// // //         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
// // //         // Supports both decoded.uid and decoded.id / decoded._id
// // //         authenticatedUid = decoded.uid || decoded.id || decoded._id;
// // //       } catch (tokenErr) {
// // //         console.log("Token verification failed or guest session");
// // //       }
// // //     }

// // //     // 2. Multi-field Database Query for Orders
// // //     if (authenticatedUid) {
// // //       userOrders = await Orders.find({
// // //         $or: [
// // //           { uid: authenticatedUid },
// // //           { user: authenticatedUid },
// // //           { userId: authenticatedUid },
// // //           { "shippingAddress.email": authenticatedUid }
// // //         ]
// // //       })
// // //       .select("orderID status totalAmount orderItems shippingAddress createdAt -_id")
// // //       .sort({ createdAt: -1 })
// // //       .limit(10);
// // //     }

// // //     // 3. Specific Order ID Fallback (e.g. ORD-20261016-115571)
// // //     const orderIdMatch = latestMessage.match(/ORD-\d{8}-[A-Z0-9]+/i);
// // //     if (orderIdMatch) {
// // //       const specificOrderId = orderIdMatch[0].toUpperCase();
// // //       const specificOrder = await Orders.findOne({ orderID: specificOrderId })
// // //         .select("orderID status totalAmount orderItems shippingAddress createdAt -_id");
      
// // //       if (specificOrder && !userOrders.some(o => o.orderID === specificOrderId)) {
// // //         userOrders.push(specificOrder);
// // //       }
// // //     }

// // //     // 4. Smart Keyword Product Search
// // //     let matchedProducts = [];
// // //     const searchKeywords = latestMessage
// // //       .replace(/[^a-zA-Z0-9 ]/g, "")
// // //       .split(" ")
// // //       .filter(word => word.length > 2);

// // //     if (searchKeywords.length > 0 && !orderIdMatch && !latestMessage.toLowerCase().includes("order")) {
// // //       const regexQuery = searchKeywords.join("|");
// // //       matchedProducts = await Products.find({
// // //         $or: [
// // //           { title: { $regex: regexQuery,$options: "i" } },
// // //           { category: { $regex: regexQuery,$options: "i" } },
// // //           { description: { $regex: regexQuery,$options: "i" } }
// // //         ]
// // //       }).select("id title price category stockQuantity description -_id").limit(5);
// // //     }

// // //     if (matchedProducts.length === 0) {
// // //       matchedProducts = await Products.find({})
// // //         .select("id title price category stockQuantity description -_id")
// // //         .limit(10);
// // //     }

// // //     // 5. System Prompt
// // //     const systemPrompt = `
// // //       You are "Vibe Cart AI", an expert e-commerce shopping and customer support assistant.

// // //       RELEVANT PRODUCTS FOUND:
// // //       ${JSON.stringify(matchedProducts)}

// // //       USER ORDER HISTORY & TRACKING DATA:
// // //       ${userOrders.length > 0 ? JSON.stringify(userOrders) : "No order history found for this session."}

// // //       Guidelines:
// // //       - If user asks for "my orders" or tracking, and orders exist in "USER ORDER HISTORY & TRACKING DATA", list ALL of them clearly with Order IDs, Status, Total Amount, and Items.
// // //       - If no orders are found, gently inform them to verify if they are logged in or provide their Order ID.
// // //       - Be polite, concise, and helpful.
// // //     `;

// // //     // 6. Generate AI Text
// // //     const aiResponse = await generateText({
// // //       model: groq("qwen/qwen3.8-27b"),
// // //       system: systemPrompt,
// // //       messages: messages.map(msg => ({
// // //         role: msg.role,
// // //         content: msg.content
// // //       })),
// // //       maxTokens: 400,
// // //     });

// // //     return res.status(200).json({ 
// // //       content: aiResponse.text || "I am here to help you with products and orders!", 
// // //       isError: false 
// // //     });
// // //     console.log(aiResponse);

// // //   } catch (error) {
// // //     console.error("AI Route Error:", error);
// // //     return res.status(500).json({ 
// // //       content: "I'm having trouble connecting to store services right now. Please try again shortly.", 
// // //       isError: true 
// // //     });
// // //   }
// // // });

// // // module.exports = router;



// // const express = require("express");
// // const router = express.Router();
// // const Products = require("../models/products");
// // const Orders = require("../models/orders");
// // const jwt = require("jsonwebtoken");

// // router.post("/chat", async (req, res) => {
// //   try {
// //     // 💡 Dynamic imports to prevent ERR_REQUIRE_ESM on Vercel Serverless
// //     const { generateText } = await import("ai");
// //     const { createOpenAI } = await import("@ai-sdk/openai");

// //     const groq = createOpenAI({
// //       baseURL: "https://api.groq.com/openai/v1",
// //       apiKey: process.env.GROQ_API_KEY,
// //     });

// //     const { messages } = req.body;

// //     if (!messages || !Array.isArray(messages)) {
// //       return res.status(400).json({ message: "Invalid messages format", isError: true });
// //     }

// //     let userOrders = [];
// //     let authenticatedUid = null;
// //     const latestMessage = messages[messages.length - 1]?.content || "";

// //     // 1. JWT Bearer Token Verification with Field Fallback
// //     const authHeader = req.headers.authorization;
// //     if (authHeader && authHeader.startsWith("Bearer ")) {
// //       try {
// //         const token = authHeader.split(" ")[1];
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
// //         authenticatedUid = decoded.uid || decoded.id || decoded._id;
// //       } catch (tokenErr) {
// //         console.log("Token verification failed or guest session");
// //       }
// //     }

// //     // 2. Multi-field Database Query for Orders
// //     if (authenticatedUid) {
// //       userOrders = await Orders.find({
// //         $or: [
// //           { uid: authenticatedUid },
// //           { user: authenticatedUid },
// //           { userId: authenticatedUid },
// //           { "shippingAddress.email": authenticatedUid }
// //         ]
// //       })
// //       .select("orderID status totalAmount orderItems shippingAddress createdAt -_id")
// //       .sort({ createdAt: -1 })
// //       .limit(10);
// //     }

// //     // 3. Specific Order ID Fallback (e.g. ORD-20261016-115571)
// //     const orderIdMatch = latestMessage.match(/ORD-\d{8}-[A-Z0-9]+/i);
// //     if (orderIdMatch) {
// //       const specificOrderId = orderIdMatch[0].toUpperCase();
// //       const specificOrder = await Orders.findOne({ orderID: specificOrderId })
// //         .select("orderID status totalAmount orderItems shippingAddress createdAt -_id");
      
// //       if (specificOrder && !userOrders.some(o => o.orderID === specificOrderId)) {
// //         userOrders.push(specificOrder);
// //       }
// //     }

// //     // 4. Smart Keyword Product Search
// //     let matchedProducts = [];
// //     const searchKeywords = latestMessage
// //       .replace(/[^a-zA-Z0-9 ]/g, "")
// //       .split(" ")
// //       .filter(word => word.length > 2);

// //     if (searchKeywords.length > 0 && !orderIdMatch && !latestMessage.toLowerCase().includes("order")) {
// //       const regexQuery = searchKeywords.join("|");
// //       matchedProducts = await Products.find({
// //         $or: [
// //           { title: { $regex: regexQuery,$options: "i" } },
// //           { category: { $regex: regexQuery,$options: "i" } },
// //           { description: { $regex: regexQuery,$options: "i" } }
// //         ]
// //       }).select("id title price category stockQuantity description -_id").limit(5);
// //     }

// //     if (matchedProducts.length === 0) {
// //       matchedProducts = await Products.find({})
// //         .select("id title price category stockQuantity description -_id")
// //         .limit(10);
// //     }

// //     // 5. System Prompt
// //     const systemPrompt = `
// //       You are "Vibe Cart AI", an expert e-commerce shopping and customer support assistant.

// //       RELEVANT PRODUCTS FOUND:
// //       ${JSON.stringify(matchedProducts)}

// //       USER ORDER HISTORY & TRACKING DATA:
// //       ${userOrders.length > 0 ? JSON.stringify(userOrders) : "No order history found for this session."}

// //       Guidelines:
// //       - If user asks for "my orders" or tracking, and orders exist in "USER ORDER HISTORY & TRACKING DATA", list ALL of them clearly with Order IDs, Status, Total Amount, and Items.
// //       - If no orders are found, gently inform them to verify if they are logged in or provide their Order ID.
// //       - Be polite, concise, and helpful.
// //     `;

// //     // 6. Generate AI Text
// //     const aiResponse = await generateText({
// //       model: groq("qwen/qwen2.5-32b"), // Updated to supported Groq model identifier
// //       system: systemPrompt,
// //       messages: messages.map(msg => ({
// //         role: msg.role,
// //         content: msg.content
// //       })),
// //       maxTokens: 400,
// //     });

// //     return res.status(200).json({ 
// //       content: aiResponse.text || "I am here to help you with products and orders!", 
// //       isError: false 
// //     });

// //   } catch (error) {
// //     console.error("AI Route Error:", error);
// //     return res.status(500).json({ 
// //       content: "I'm having trouble connecting to store services right now. Please try again shortly.", 
// //       isError: true 
// //     });
// //   }
// // });

// // module.exports = router;

const express = require("express");
const router = express.Router();
const Products = require("../models/products");
const Orders = require("../models/orders");
const jwt = require("jsonwebtoken");

router.post("/chat", async (req, res) => {
  try {
    // 💡 Dynamic imports to prevent ERR_REQUIRE_ESM on Vercel Serverless
    const { generateText } = await import("ai");
    const { createOpenAI } = await import("@ai-sdk/openai");

    const groq = createOpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: process.env.GROQ_API_KEY,
    });

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: "Invalid messages format", isError: true });
    }

    let userOrders = [];
    let authenticatedUid = null;
    const latestMessage = messages[messages.length - 1]?.content || "";

    // 1. JWT Bearer Token Verification with Field Fallback
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        authenticatedUid = decoded.uid || decoded.id || decoded._id;
      } catch (tokenErr) {
        console.log("Token verification failed or guest session");
      }
    }

    // 2. Multi-field Database Query for Orders
    if (authenticatedUid) {
      userOrders = await Orders.find({
        $or: [
          { uid: authenticatedUid },
          { user: authenticatedUid },
          { userId: authenticatedUid },
          { "shippingAddress.email": authenticatedUid }
        ]
      })
      .select("orderID status totalAmount orderItems shippingAddress createdAt -_id")
      .sort({ createdAt: -1 })
      .limit(10);
    }

    // 3. Specific Order ID Fallback
    const orderIdMatch = latestMessage.match(/ORD-\d{8}-[A-Z0-9]+/i);
    if (orderIdMatch) {
      const specificOrderId = orderIdMatch[0].toUpperCase();
      const specificOrder = await Orders.findOne({ orderID: specificOrderId })
        .select("orderID status totalAmount orderItems shippingAddress createdAt -_id");
      
      if (specificOrder && !userOrders.some(o => o.orderID === specificOrderId)) {
        userOrders.push(specificOrder);
      }
    }

    // 4. Smart Keyword Product Search
    let matchedProducts = [];
    const searchKeywords = latestMessage
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .filter(word => word.length > 2);

    if (searchKeywords.length > 0 && !orderIdMatch && !latestMessage.toLowerCase().includes("order")) {
      const regexQuery = searchKeywords.join("|");
      matchedProducts = await Products.find({
        $or: [
          { title: { $regex: regexQuery,$options: "i" } },
          { category: { $regex: regexQuery,$options: "i" } },
          { description: { $regex: regexQuery,$options: "i" } }
        ]
      }).select("id title price category stockQuantity description -_id").limit(5);
    }

    if (matchedProducts.length === 0) {
      matchedProducts = await Products.find({})
        .select("id title price category stockQuantity description -_id")
        .limit(10);
    }

    // 5. System Prompt
    const systemPrompt = `
      You are "Vibe Cart AI", an expert e-commerce shopping and customer support assistant.

      RELEVANT PRODUCTS FOUND:
      ${JSON.stringify(matchedProducts)}

      USER ORDER HISTORY & TRACKING DATA:
      ${userOrders.length > 0 ? JSON.stringify(userOrders) : "No order history found for this session."}

      Guidelines:
      - If user asks for "my orders" or tracking, and orders exist in "USER ORDER HISTORY & TRACKING DATA", list ALL of them clearly with Order IDs, Status, Total Amount, and Items.
      - If no orders are found, gently inform them to verify if they are logged in or provide their Order ID.
      - Be polite, concise, and helpful.
    `;

    // 6. Generate AI Text (Using Groq supported production model)
    const aiResponse = await generateText({
      model: groq("qwen/qwen3.8-27b"),
      system: systemPrompt,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      maxTokens: 400,
    });

    return res.status(200).json({ 
      content: aiResponse.text || "I am here to help you with products and orders!", 
      isError: false 
    });

  } catch (error) {
    console.error("AI Route Error:", error);
    return res.status(500).json({ 
      content: "I'm having trouble connecting to store services right now. Please try again shortly.", 
      isError: true 
    });
  }
});

module.exports = router;


