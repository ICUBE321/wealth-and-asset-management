// growth model
const mongoose = require("mongoose");
const idType = mongoose.Schema.Types.ObjectId;

const GrowthSchema = new mongoose.Schema({
  portfolioValue: {
    type: Number,
    required: [true, "portfolio value is required"],
  },
  month: {
    type: String,
    required: [true, "month is required"],
  },
  isInitialValue: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: idType,
    required: true,
  },
});

module.exports = mongoose.model("Growth", GrowthSchema);
