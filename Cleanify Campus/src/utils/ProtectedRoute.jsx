import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role mismatch
  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin-dashboard" : "/dashboard"}
        replace
      />
    );
  }

  // ✅ CONFIRM LOGOUT ON BACK / NAVIGATION
  useEffect(() => {
    const handlePopState = () => {
      const confirmLogout = window.confirm(
        "Are you sure you want to logout?"
      );

      if (confirmLogout) {
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      } else {
        window.history.pushState(null, "", location.pathname);
      }
    };

    window.history.pushState(null, "", location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname, navigate]);

  return children;
};

export default ProtectedRoute;
