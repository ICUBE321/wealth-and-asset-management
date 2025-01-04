// asset database model
const mongoose = require("mongoose");
const idType = mongoose.Schema.Types.ObjectId;

const AssetSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "asset already exists"],
    required: [true, "asset name is required"],
  },
  type: {
    type: String,
    required: [true, "asset type is required"],
  },
  value: {
    type: Number,
  },
  userId: {
    type: idType,
    required: true,
  },
});

module.exports = mongoose.model("Asset", AssetSchema);
