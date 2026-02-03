const express = require("express");
const router = express.Router();
const {
  createReport,
  getReports,
  updateReportStatus,
} = require("../controllers/reportController");

router.post("/", createReport);
router.get("/", getReports);
router.put("/:id", updateReportStatus); // 🔑 REQUIRED

module.exports = router;
