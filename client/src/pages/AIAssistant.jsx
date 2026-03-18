import { useState, useContext } from "react";
import api from "../utils/api";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I am your CleanifyCampus AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { addActivity } = useContext(AuthContext);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const res = await api.post("/ai/chat", { question: userMessage.text });
      setMessages((prev) => [...prev, { sender: "ai", text: res.data.answer }]);
      addActivity(`Asked AI Assistant: ${userMessage.text}`, "ai");
      toast.success("AI response received");
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "ai", text: "Sorry, I am currently unavailable. Please try again later." }]);
      toast.error("Unable to connect to AI Assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col h-[calc(100vh-72px)] gap-6 space-y-2">
      {/* Page Header Selection */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6 flex-shrink-0">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Campus AI Assistant</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Ask questions about campus facilities, schedules, and services.</p>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 bg-white dark:bg-gray-800 border. border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm flex flex-col overflow-hidden relative">
        {/* Chat History Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 dark:bg-[#111827]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-timeline`} style={{ animationDelay: '100ms' }}>
              <div className={`flex max-w-2xl space-x-4 ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${msg.sender === "user" ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900" : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"}`}>
                  {msg.sender === "user" ? <User className="w-5 h-5"/> : <Bot className="w-5 h-5"/>}
                </div>
                <div className={`p-5 rounded-2xl shadow-sm ${
                  msg.sender === "user" 
                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 rounded-tr-none" 
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700/60 rounded-tl-none"
                }`}>
                  <div className="whitespace-pre-wrap whitespace-pre-line text-[15px] leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-timeline">
              <div className="flex max-w-[80%] space-x-4">
                <div className="flex-shrink-0 w-10 h-10 shadow-sm rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5"/>
                </div>
                <div className="p-4 rounded-2xl rounded-tl-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center space-x-2 shadow-sm h-[52px]">
                   <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce"></span>
                   <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce" style={{animationDelay: '0.15s'}}></span>
                   <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce" style={{animationDelay: '0.3s'}}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action input strip */}
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700/60 flex-shrink-0">
          <form onSubmit={sendMessage} className="flex relative items-center max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Type your question..."
              className="w-full pl-6 pr-16 py-4 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2.5 p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-[-2px] mt-[1px]" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
