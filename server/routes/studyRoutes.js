const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createOrUpdateProfile, getStudyPartners, getMyProfile } = require("../controllers/studyController");

router.post("/profile", authMiddleware, createOrUpdateProfile);
router.get("/profile/me", authMiddleware, getMyProfile);
router.get("/partners", authMiddleware, getStudyPartners);

module.exports = router;
