const Report = require("../models/Report");

// CREATE REPORT
exports.createReport = async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json(report);
  } catch (err) {
    console.error("Create report error:", err);
    res.status(500).json({ message: "Create failed" });
  }
};

// GET REPORTS
// 👉 Student: ?email=abc@lpu.in
// 👉 Admin: no query param
exports.getReports = async (req, res) => {
  try {
    const { email } = req.query;

    let reports;

    if (email) {
      console.log("FETCH FOR STUDENT:", email);
      reports = await Report.find({ userEmail: email }).sort({
        createdAt: -1,
      });
    } else {
      console.log("FETCH FOR ADMIN (ALL REPORTS)");
      reports = await Report.find().sort({
        createdAt: -1,
      });
    }

    res.json(reports);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
};
// UPDATE REPORT STATUS (ADMIN)
exports.updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Status update failed" });
  }
};
