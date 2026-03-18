const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { createComplaint, getComplaints, updateComplaintStatus } = require("../controllers/complaintController");
const authMiddleware = require("../middleware/authMiddleware");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.route("/")
  .post(authMiddleware, upload.single("image"), createComplaint)
  .get(authMiddleware, getComplaints);

router.route("/:id/status").put(authMiddleware, updateComplaintStatus);

module.exports = router;
