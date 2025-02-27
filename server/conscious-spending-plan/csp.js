// counscious spending plan router
const express = require("express");
const router = express.Router();
const CSPItem = require("./cspItemModel");
const validCategories = [
  "expense",
  "savings",
  "investment",
  "guilt-free spending",
];

// routes
// retrieve all user's csp items
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(`Retrieving all csp items for user ${userId}...`);
    const items = await CSPItem.find({ userId: userId });
    console.log(`List of returned items ${items}`);
    res.status(200).json(items);
  } catch (error) {
    console.log(`csp - Get All CSP Items error: ${error}`);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// enter new csp item
router.post("/", async (req, res) => {
  try {
    let passedCategory = req.body.category;
    // validate item catgeory
    if (!validCategories.includes(passedCategory)) {
      // return error
      console.log(`Invalid category: ${passedCategory}`);
      res.status(400).json({ message: "Invalid CSP item category" });
      return;
    }

    const item = new CSPItem({
      name: req.body.name,
      category: passedCategory,
      cost: req.body.cost,
      userId: req.body.userId,
    });
    console.log(`Adding csp item: ${JSON.stringify(item)}`);
    const newItem = await item.save();
    res.status(200).json(newItem);
  } catch (error) {
    console.log(`csp - Add CSP Item error: ${error}`);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

//update existing csp item
router.put("/", async (req, res) => {
  try {
    const itemId = req.query.id;
    const newItem = {
      name: req.body.name,
      category: req.body.category,
      cost: req.body.cost,
      userId: req.body.userId,
    };
    let updatedItem = await CSPItem.updateOne({ _id: itemId }, newItem);
    console.log(`updated item: ${JSON.stringify(updatedItem)}`);
    updatedItem = await CSPItem.findOne({ _id: itemId });
    console.log(`found item: ${JSON.stringify(updatedItem)}`);
    res.status(200).json(updatedItem);
  } catch (error) {
    console.log(`csp - Update CSP Item error: ${error}`);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// remove existing CSP item
router.delete("/", async (req, res) => {
  try {
    const itemId = req.query.itemId;
    console.log(`Deleteing CSP item: ${itemId}`);
    const deletedItem = await CSPItem.deleteOne({ _id: itemId });
    console.log(`deleted item: ${JSON.stringify(deletedItem)}`);
    res.status(200).json(deletedItem);
  } catch (error) {
    console.log(`csp - Delete CSP Item error: ${error}`);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

module.exports = router;
