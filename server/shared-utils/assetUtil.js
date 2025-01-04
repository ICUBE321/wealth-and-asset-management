// for exposing functions related to Assets
const Asset = require("../asset-tracker/assetModel");

//retrieve all user asset values
const getAllAssetValues = async (userId) => {
  try {
    console.log(`Retrieving all assets for user ${userId}...`);
    const assets = await Asset.find({ userId: userId });
    const assetValues = assets.map((asset) => asset.value);
    console.log(`List of returned asset values ${assetValues}`);
    return assetValues;
  } catch (error) {
    console.log(`assetUtil - Get All Asset Values: ${error.message}`);
  }
};

module.exports = {
  getAllAssetValues,
};
