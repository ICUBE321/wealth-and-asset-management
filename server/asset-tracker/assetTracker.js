// asset tracker router
const express = require("express");
const router = express.Router();
const Asset = require("./assetModel");

// routes
// get all user's assets
router.get("/all", async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(`Retrieving all assets for user ${userId}...`);
    const assets = await Asset.find({ userId: userId });
    console.log(`List of returned assets ${assets}`);
    res.status(200).json(assets);
  } catch (error) {
    console.log(`assetTracker - Get All Assets Error: ${error.message}`);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// add new asset
router.post("/", async (req, res) => {
  try {
    const asset = new Asset({
      name: req.body.inputs.name,
      type: req.body.inputs.type,
      value: req.body.inputs.value,
      userId: req.body.userId,
    });
    console.log(`Adding asset: ${JSON.stringify(asset)}`);
    const newAsset = await asset.save();

    console.log(`Added asset: ${JSON.stringify(newAsset)}`);
    res.status(200).json(newAsset);
  } catch (error) {
    console.log(`assetTracker - Add Asset error: ${error}`);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// modify asset details
router.post("/update", async (req, res) => {
  try {
    // console.log(`request body: ${JSON.stringify(req.body)}`);
    const assetID = req.body.inputs.id;
    const newAsset = {
      name: req.body.inputs.name,
      type: req.body.inputs.type,
      value: req.body.inputs.value,
      userId: req.body.userId,
    };
    let updatedAsset = await Asset.updateOne({ _id: assetID }, newAsset);
    console.log(`updated asset: ${JSON.stringify(updatedAsset)}`);
    updatedAsset = await Asset.findOne({ _id: assetID });
    console.log(`found asset: ${JSON.stringify(updatedAsset)}`);
    res.status(200).json(updatedAsset);
  } catch (error) {
    console.log(`assetTracker - Update Asset error: ${error}`);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// remove an asset
router.delete("/:id", async (req, res) => {
  try {
    const assetID = req.params["id"];
    console.log(`Deleteing asset: ${assetID}`);
    const deletedAsset = await Asset.deleteOne({ _id: assetID });
    console.log(`deleted asset: ${JSON.stringify(deletedAsset)}`);
    res.status(200).json(deletedAsset);
  } catch (error) {
    console.log(`assetTracker - Delete Asset error: ${error}`);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

module.exports = router;
