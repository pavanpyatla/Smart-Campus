const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const studyRoutes = require("./routes/studyRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

/* ================== DATABASE ================== */
connectDB();

/* ================== MIDDLEWARE ================== */
app.use(cors());
app.use(express.json({ limit: "2mb" }));
// Serve the uploads directory statically so frontend can access images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================== ROUTES ================== */
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/study", studyRoutes);
app.use("/api/ai", aiRoutes);

/* ================== SERVER ================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
