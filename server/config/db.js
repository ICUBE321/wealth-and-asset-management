const mongoose = require("mongoose");

const connectToDatabase = async (uri) => {
  try {
    console.log("Connecting to the database...");
    await mongoose.connect(uri);
    console.log("Database connected successfully...");
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    // Exit the process if the connection fails
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to the database");
});

mongoose.connection.on("error", (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = connectToDatabase;
