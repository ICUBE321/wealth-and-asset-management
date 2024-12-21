// start up Express server using Nodejs
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const assetTracker = require("./asset-tracker/assetTracker");

const app = express();
console.log(process.env.PORT);
const port = process.env.PORT || 3000;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/asset-tracker", assetTracker);

app.listen(port, () => {
  console.log(`This app is listening on port ${port}`);
});
