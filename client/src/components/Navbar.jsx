import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X, Leaf, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed w-full top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-[100] border-b border-gray-100 dark:border-gray-800 transition-colors pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2 relative z-50">
            <Leaf className="w-8 h-8 text-green-600 dark:text-green-400" />
            <span className="font-extrabold text-xl text-gray-900 dark:text-white hidden sm:block">CleanifyCampus</span>
          </Link>

          <div className="flex items-center space-x-4 md:space-x-8">
            {user ? (
              <>
                <div className="hidden md:flex space-x-6 relative z-50">
                  <Link to="/complaints" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Complaints</Link>
                  <Link to="/study-partners" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Study Partners</Link>
                  <Link to="/ai-assistant" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">AI Assistant</Link>
                </div>
                <div className="flex items-center space-x-4 relative z-50">
                  <span className="text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1 px-3 rounded-full hidden sm:block">
                    {user.name} ({user.role})
                  </span>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/50 flex items-center relative z-50 cursor-pointer pointer-events-auto"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
