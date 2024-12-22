// start up Express server using Nodejs
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectToDatabase = require("./config/db");
const assetTracker = require("./asset-tracker/assetTracker");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// connect to database
const mongoDbUri = process.env.MONGODB_URI;
connectToDatabase(mongoDbUri);

app.use("/assettracker", assetTracker);

app.get("/", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

app.listen(port, () => {
  console.log(`This app is listening on port ${port}`);
});
