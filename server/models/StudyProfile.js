const mongoose = require("mongoose");

const studyProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  subjects: [{ type: String, required: true }],
  availableTime: { type: String, required: true },
  preferredLocation: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("StudyProfile", studyProfileSchema);
