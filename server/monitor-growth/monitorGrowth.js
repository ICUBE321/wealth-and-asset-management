// monitor growth router
const express = require("express");
const router = express.Router();
const growthUtil = require("../shared-utils/growthUtil");
const Growth = require("./growthModel");

//routes
//manually save the monthly portfolio sum
router.post("/trigger-monthly-save", async (req, res) => {
  try {
    await growthUtil.saveMonthlyPortfolioValue();
    res.status(200).send("Monthly portfolio data saved!");
  } catch (error) {
    console.log(`monitorGrowth - Save portfolio sum error: ${error}`);
    res.status(500).send(`Error saving portfolio sum ${error.message}`);
  }
});

//retrieve all growth values
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(`Retrieving all growths for user ${userId}...`);
    const growths = await Growth.find({ userId: userId });
    console.log(`List of returned growths ${growths}`);
    res.status(200).json(growths);
  } catch (error) {
    console.log(`monitorGrowth - Retrieve growth values error: ${error}`);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

module.exports = router;
