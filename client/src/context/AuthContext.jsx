import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Initialize activities from localStorage
  const [activities, setActivities] = useState(() => {
    try {
      const stored = localStorage.getItem("activities");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to parse activities from localStorage", e);
      return [];
    }
  });

  // Sync activities to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("activities", JSON.stringify(activities));
    } catch (e) {
      console.error("Failed to save activities to localStorage", e);
    }
  }, [activities]);

  const addActivity = (message, type) => {
    setActivities((prev) => {
      // Prevent duplicate messages in a row
      if (prev.length > 0 && prev[0].message === message) return prev;
      
      const newActivity = {
        id: Date.now(),
        message,
        type,
        time: Date.now() // Save as timestamp
      };
      
      // Keep only the latest 10 activities
      return [newActivity, ...prev].slice(0, 10);
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    // Explicitly grab user data including role
    const userRes = await api.get("/auth/me");
    setUser(userRes.data);
  };

  const register = async (name, email, password, role = "student") => {
    const res = await api.post("/auth/register", { name, email, password, role });
    localStorage.setItem("token", res.data.token);
    setUser(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("activities");
    setUser(null);
    setActivities([]);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, activities, addActivity }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
