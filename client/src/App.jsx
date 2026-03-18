import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Complaints from "./pages/Complaints";
import StudyPartners from "./pages/StudyPartners";
import AIAssistant from "./pages/AIAssistant";
import Dashboard from "./pages/Dashboard";

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '10px',
            },
            success: {
              style: {
                background: '#059669',
              },
            },
            error: {
              style: {
                background: '#E11D48',
              },
            },
          }} 
        />
        <Navbar />
        <main className="pt-[72px]">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/study-partners" element={<StudyPartners />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
            </Route>
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
