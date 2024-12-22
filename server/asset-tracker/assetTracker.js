// asset tracker router
const express = require("express");
const Asset = require("./assetModel");
const router = express.Router();

// routes
// get all assets
router.get("/all", async (req, res) => {
  try {
    console.log("Retrieving all user assets...");
    const assets = await Asset.find({});
    console.log(`List of returned assets ${assets}`);
    res.status(200).json(assets);
  } catch (error) {
    console.log(`assetTracker - Get All Assets error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// add new asset
router.post("/", async (req, res) => {
  try {
    const { name, type, value, quantity } = req.body;

    const asset = new Asset({
      name: name,
      type: type,
      value: value,
      quantity: quantity,
    });
    console.log(`Adding asset: ${JSON.stringify(asset)}`);
    const newAsset = await asset.save();

    console.log(`Added asset: ${JSON.stringify(newAsset)}`);
    res.status(200).json(newAsset);
  } catch (error) {
    console.log(`assetTracker - Add Asset error: ${error}`);
  }
});

// modify asset details
router.post("/update", async (req, res) => {
  try {
    const assetID = req.body.id;
    const newAsset = {
      name: req.body.name,
      type: req.body.type,
      value: req.body.value,
      quantity: req.body.quantity,
    };
    let updatedAsset = await Asset.updateOne({ _id: assetID }, newAsset);
    console.log(`updated asset: ${JSON.stringify(updatedAsset)}`);
    updatedAsset = await Asset.findOne({ _id: assetID });
    console.log(`found asset: ${JSON.stringify(updatedAsset)}`);
    res.status(200).json(updatedAsset);
  } catch (error) {
    console.log(`assetTracker - Update Asset error: ${error}`);
  }
});

// remove an asset
router.delete("/", async (req, res) => {
  try {
    const assetID = req.body.id;
    const deletedAsset = await Asset.deleteOne({ _id: assetID });
    console.log(`deleted asset: ${JSON.stringify(deletedAsset)}`);
    res.status(200).json(deletedAsset);
  } catch (error) {
    console.log(`assetTracker - Delete Asset error: ${error}`);
  }
});

module.exports = router;
