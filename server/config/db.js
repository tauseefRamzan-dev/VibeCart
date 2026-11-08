// const mongoose = require("mongoose");

// const {
//   MONGODB_USERNAME = "",
//   MONGODB_PASSWORD = "",
//   MONGODB_NAME = "",
// } = process.env;

// const connectToMongoDB = async () => {
//   try {
//     const uri = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@ac-ktbpm3p-shard-00-00.n1fat9i.mongodb.net:27017,ac-ktbpm3p-shard-00-01.n1fat9i.mongodb.net:27017,ac-ktbpm3p-shard-00-02.n1fat9i.mongodb.net:27017/?ssl=true&replicaSet=atlas-z2jbep-shard-0&authSource=admin&appName=Cluster0`;

//     await mongoose.connect(uri, {
//       dbName: MONGODB_NAME,
//     });

//     console.log("You successfully connected to MongoDB via Mongoose!");
//     return mongoose;
//   } catch (err) {
//     console.error("Mongoose connection error:", err);
//   }
// };
// const disconnectFromMongoDB = async () => {
//   await mongoose.connection.close();
// };

// module.exports = { connectToMongoDB, disconnectFromMongoDB };


const mongoose = require("mongoose");

const {
  MONGODB_USERNAME = "",
  MONGODB_PASSWORD = "",
  MONGODB_NAME = "",
} = process.env;

const connectToMongoDB = async () => {
  try {
    // Atlas ka standard aur reliable SRV connection string use karein
    const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.n1fat9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(uri, {
      dbName: MONGODB_NAME,
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
    });

    console.log("You successfully connected to MongoDB via Mongoose!");
    return mongoose;
  } catch (err) {
    console.error("Mongoose connection error:", err);
    throw err;
  }
};

const disconnectFromMongoDB = async () => {
  await mongoose.connection.close();
};

module.exports = { connectToMongoDB, disconnectFromMongoDB };