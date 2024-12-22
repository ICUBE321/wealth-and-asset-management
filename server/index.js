// start up Express server using Nodejs
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const assetTracker = require("./asset-tracker/assetTracker");

const app = express();
console.log(process.env.PORT);
const port = process.env.PORT || 3000;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

try {
  console.log("Connecting to the database...");
  const mongodbUri = process.env.MONGODB_URI;
  mongoose.connect(mongodbUri);
  console.log("Database connected successfully...");
} catch (error) {
  console.log(`Error connecting Mongodb ${error}`);
  return;
}

app.use("/assettracker", assetTracker);

app.get("/", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

app.listen(port, () => {
  console.log(`This app is listening on port ${port}`);
});
