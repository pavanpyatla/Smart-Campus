const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatBot = async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Improved prompt based on user feedback
    const prompt = `
You are the AI assistant for CleanifyCampus platform.
Answer campus related questions clearly and shortly.

Question:
${question}
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ answer: text });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: "AI Assistant is currently unavailable" });
  }
};
