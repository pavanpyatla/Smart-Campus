import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { REPORTS_API } from "../config/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  /* 🔐 ADMIN USER */
  const user = JSON.parse(localStorage.getItem("user"));

  /* 📄 REPORTS */
  const [reports, setReports] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  /* 🔒 PROTECT ADMIN ROUTE */
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  /* 🌐 FETCH REPORTS */
  const fetchReports = async () => {
    try {
      const res = await fetch(REPORTS_API);
      const data = await res.json();

      if (Array.isArray(data)) {
        setReports(data);
      } else {
        setReports([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setReports([]);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchReports();
    }
  }, [user]);

  /* 🔁 UPDATE STATUS */
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${REPORTS_API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Update failed");

      fetchReports(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  const statusColor = (status) => {
    if (status === "Cleaned") return "bg-green-100 text-green-700";
    if (status === "In Progress") return "bg-blue-100 text-blue-700";
    return "bg-orange-100 text-orange-700";
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 pt-28 px-6">
      
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-green-700">
          Admin Dashboard 🛠️
        </h2>
        <p className="text-gray-600">
          Monitor and manage all reported waste issues
        </p>
      </div>

      {/* REPORTS */}
      <div className="grid gap-6">
        {reports.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
            No reports available.
          </div>
        ) : (
          reports.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-2xl shadow-lg p-6 grid md:grid-cols-5 gap-6"
            >
              {/* IMAGE */}
              <div>
                {r.image ? (
                  <img
                    src={r.image}
                    alt="Waste"
                    onClick={() => setSelectedImage(r.image)}
                    className="h-36 w-full object-cover rounded-xl cursor-pointer hover:scale-105 transition"
                  />
                ) : (
                  <div className="h-36 flex items-center justify-center bg-gray-100 rounded-xl text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* DETAILS */}
              <div className="md:col-span-3 space-y-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    ⏰ {new Date(r.createdAt).toLocaleString()}
                  </span>
                </div>

                <p><b>📍 Location:</b> {r.location}</p>
                <p><b>🗑️ Waste Type:</b> {r.type}</p>

                {r.description && (
                  <p><b>📝 Description:</b> {r.description}</p>
                )}

                <p className="text-sm text-gray-600">
                  👤 Reported by: {r.userEmail}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col justify-center gap-3">
                <button
                  onClick={() => updateStatus(r._id, "In Progress")}
                  className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  In Progress
                </button>
                <button
                  onClick={() => updateStatus(r._id, "Cleaned")}
                  className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Mark Cleaned
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="max-h-[90%] max-w-[90%] rounded-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
