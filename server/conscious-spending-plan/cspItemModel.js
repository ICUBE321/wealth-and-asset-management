// csp database model
const mongoose = require("mongoose");
const idType = mongoose.Schema.Types.ObjectId;

const CSPItemSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "csp item already exists"],
    required: [true, "csp item name is required"],
  },
  category: {
    type: String,
    required: [true, "csp item category is required"],
  },
  cost: {
    type: Number,
    required: [true, "csp item cost is required"],
  },
  userId: {
    type: idType,
    required: true,
  },
});

module.exports = mongoose.model("CSPItem", CSPItemSchema);
