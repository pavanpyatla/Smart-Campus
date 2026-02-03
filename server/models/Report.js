const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    type: { type: String, required: true },
    description: String,
    image: String,
    userEmail: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Cleaned"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
