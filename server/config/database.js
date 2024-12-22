const mongoose = require("mongoose");

let connected = false;

const connectDB = async () => {
  console.log("Connecting to the database...");
  mongoose.set("strictQuery", true);

  // if the database is already connected, don't connect again
  if (connected) {
    console.log("MongoDB is already connected...");
    return;
  }

  //connect to mongodb
  try {
    const mongodbUri = process.env.MONGODB_URI;
    console.log(
      mongodbUri ? "Mongo DB URI not empty" : "Mongo DB Uri is empty"
    );
    await mongoose.connect(mongodbUri);
    connected = true;
    console.log("MongoDB connected...");
  } catch (error) {
    console.log(`Error connecting Mongodb ${error}`);
  }
};

module.exports = connectDB;
