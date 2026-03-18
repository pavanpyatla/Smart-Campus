const Complaint = require("../models/Complaint");

// @desc    Create a new complaint
// @route   POST /api/complaints
// @access  Private
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    let image = "";

    if (req.file) {
      // Store relative path
      image = `/uploads/${req.file.filename}`;
    }

    const complaint = await Complaint.create({
      userId: req.user.id,
      title,
      description,
      location,
      image,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private
exports.getComplaints = async (req, res) => {
  try {
    let complaints;
    if (req.user.role === "admin") {
      complaints = await Complaint.find().populate("userId", "name email");
    } else {
      complaints = await Complaint.find({ userId: req.user.id }).populate("userId", "name email");
    }
    // Sort by newest first
    complaints = complaints.sort((a, b) => b.createdAt - a.createdAt);
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id/status
// @access  Private/Admin
exports.updateComplaintStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    const { status } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
