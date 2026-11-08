// require('dotenv').config();
// const express=require("express");
// const app=express();
// const http=require("http");
// const { Server } = require("socket.io");
// const jwt = require("jsonwebtoken");
// const cors=require("cors")
// const { connectToMongoDB, disconnectFromMongoDB }=require("./config/db")

// const httpServer = http.createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.CLIENT_URL || "*",
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//   },
// });

// io.use((socket, next) => {
//   try {
//     const token = socket.handshake.auth?.token;
//     if (!token) return next(new Error("Authentication required"));
//     socket.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     next();
//   } catch (error) {
//     next(new Error("Invalid or expired token"));
//   }
// });


// io.on("connection", (socket) => {
//   const { uid, role } = socket.user;

//   // Each customer gets a private room; admins share the admin room.
//   if (uid) socket.join(`user:${uid}`);
//   if (role === "admin" || role === "superAdmin") socket.join("admins");

//   console.log(`Socket connected: ${socket.id} (${role || "unknown"})`);

//   socket.on("disconnect", (reason) => {
//     console.log(`Socket disconnected: ${socket.id} (${reason})`);
//   });
// });

// app.set("io", io);


// const auth=require("./routes/auth")
// const users=require("./routes/users")
// const products=require("./routes/products")
// const orders=require("./routes/orders")
// const stats=require("./routes/stats")

// const {PORT=8000}=process.env;
// app.use(express.json());

// app.use(cors());

// connectToMongoDB();
// app.get("/",(req,res)=>{
//       const now=new Date();
//       res.send(`Current Time ${now.toUTCString()}. Server is running`);
// })
// app.use("/auth",auth)
// app.use("/users",users)
// app.use("/products",products)
// app.use("/orders",orders)
// app.use("/stats",stats)
// // app.use("/todos",todos)

// // app.listen(PORT,(req,res)=>{
// //     console.log(`Server is running on port ${PORT}`)
// // })

// httpServer.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`)
// })


require('dotenv').config();
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { connectToMongoDB } = require("./config/db");
const helmet = require('helmet');

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication required"));
    socket.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    next(new Error("Invalid or expired token"));
  }
});

io.on("connection", (socket) => {
  const { uid, role } = socket.user;

  // Each customer gets a private room; admins share the admin room.
  if (uid) socket.join(`user:${uid}`);
  if (role === "admin" || role === "superAdmin") socket.join("admins");

  console.log(`Socket connected: ${socket.id} (${role || "unknown"})`);

  socket.on("disconnect", (reason) => {
    console.log(`Socket disconnected: ${socket.id} (${reason})`);
  });
});

app.set("io", io);

const auth = require("./routes/auth");
const users = require("./routes/users");
const products = require("./routes/products");
const orders = require("./routes/orders");
const stats = require("./routes/stats");
const aiRouter = require("./routes/ai");
const { PORT = 8000 } = process.env;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  const now = new Date();
  res.send(`Current Time ${now.toUTCString()}. Server is running`);
});

app.use(helmet());

app.use("/auth", auth);
app.use("/users", users);
app.use("/products", products);
app.use("/orders", orders);
app.use("/stats", stats);
app.use("/ai", aiRouter)

// Server tabhi start hoga jab MongoDB successfully connect ho jaye
connectToMongoDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB, server could not start.", err);
  });
