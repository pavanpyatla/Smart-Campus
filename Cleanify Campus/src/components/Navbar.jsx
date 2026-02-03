import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* NAVBAR SHADOW */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 🔑 SYNC USER ON ROUTE CHANGE */
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 bg-white z-50 transition-shadow ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-4">

        {/* LOGO */}
        <h1 className="text-2xl font-extrabold text-green-600">
          Cleanify Campus
        </h1>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-8">

          {/* SHOW LINKS ONLY WHEN NOT LOGGED IN */}
          {!user && (
            <ul className="hidden md:flex gap-6 font-medium text-gray-700">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#features">Features</a></li>
              <li>
                <Link to="/report" className="hover:text-green-600">
                  Report Waste
                </Link>
              </li>
            </ul>
          )}

          {/* AUTH AREA */}
          {!user ? (
            <div className="flex gap-4">
              <Link 
              to="/login"
              className=" text-black px-4 py-2">
              Login</Link>
              <Link
                to="/login"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Join Us
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-600">
                {user.role === "admin" ? "ADMIN" : "STUDENT"}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-500 font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
