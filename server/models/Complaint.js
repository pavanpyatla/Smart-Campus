const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String }, // Stores image path from multer
  status: {
    type: String,
    enum: ["Submitted", "In Progress", "Resolved"],
    default: "Submitted",
  },
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);
