const express = require("express");
const router = express.Router();
const { chatBot } = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/chat", authMiddleware, chatBot);

module.exports = router;
