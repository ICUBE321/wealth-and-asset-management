// start up Express server using Nodejs
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const connectToDatabase = require("./config/db");
const userAuth = require("./user-auth/userAuth");
const assetTracker = require("./asset-tracker/assetTracker");
const monitorGrowth = require("./monitor-growth/monitorGrowth");
const Logs = require("./logsUtil/logs");

const app = express();
const port = process.env.PORT || 3000;

// Security and middleware
app.use(helmet());
app.use(
  cors({
    origin: "*", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  })
);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// connect to database
const mongoDbUri = process.env.MONGODB_URI_DEV;
connectToDatabase(mongoDbUri);

app.use("/logs", Logs);

app.use("/userAuth", userAuth);

app.use("/assettracker", assetTracker);

app.use("/monitorGrowth", monitorGrowth);

app.get("/", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

app.listen(port, () => {
  console.log(`This app is listening on port ${port}`);
});
