const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

/* ================== MIDDLEWARE ================== */
app.use(cors());
app.use(express.json({ limit: "2mb" }));

/* ================== ROUTES ================== */
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

/* ================== DATABASE ================== */
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // prevents long hangs
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

/* ================== SERVER ================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
