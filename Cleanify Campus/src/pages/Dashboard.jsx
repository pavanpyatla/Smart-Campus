import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  /* 🔐 LOGGED-IN USER */
  const user = JSON.parse(localStorage.getItem("user"));

  /* 🔒 PROTECT DASHBOARD */
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  /* 📄 REPORTS STATE */
  const [reports, setReports] = useState([]); // ✅ always array
  const [selectedReport, setSelectedReport] = useState(null);
  const [filter, setFilter] = useState("All");

  /* 🌐 FETCH REPORTS FROM BACKEND */
  useEffect(() => {
    if (!user) return;

     fetch(
     `http://localhost:5000/api/reports?email=${encodeURIComponent(user.email)}`
     )

      .then((res) => res.json())
      .then((data) => {
        // ✅ SAFETY: never allow non-array
        if (Array.isArray(data)) {
          setReports(data);
        } else if (Array.isArray(data.reports)) {
          setReports(data.reports);
        } else {
          console.error("Invalid reports response:", data);
          setReports([]);
        }
      })
      .catch((err) => {
        console.error("Fetch reports error:", err);
        setReports([]);
      });
  }, [user]);

  if (!user) return null;

  /* 🔍 FILTER LOGIC */
  const filteredReports =
    filter === "All"
      ? reports
      : reports.filter((r) => r.status === filter);

  /* 🌱 GREEN POINTS */
  const cleanedReports = reports.filter(
    (r) => r.status === "Cleaned"
  );
  const greenPoints = cleanedReports.length * 10;

  /* 🌍 IMPACT SUMMARY */
  const totalReports = reports.length;
  const cleanedCount = cleanedReports.length;

  let badge = "🌱 Eco Starter";
  if (cleanedCount >= 5) badge = "🌿 Eco Hero";
  if (cleanedCount >= 10) badge = "🌳 Green Champion";

  /* 🧭 STATUS TIMELINE */
  const getStepStyle = (current, step) => {
    const order = ["Pending", "In Progress", "Cleaned"];
    return order.indexOf(step) <= order.indexOf(current)
      ? "bg-green-600"
      : "bg-gray-300";
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 pt-24">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          Welcome, Student 👋
        </h1>
        <p className="text-gray-600">
          Track your waste reports and impact
        </p>
      </div>

      {/* TOP CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-gray-600 mb-1">🌱 Green Points</h3>
          <p className="text-3xl font-bold text-green-600">
            {greenPoints}
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-gray-600 mb-1">📄 Total Reports</h3>
          <p className="text-3xl font-bold">
            {totalReports}
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow flex flex-col justify-between">
          <h3 className="text-gray-600 mb-3">🗑️ Report Waste</h3>
          <button
            onClick={() => navigate("/report")}
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            New Report
          </button>
        </div>
      </div>

      {/* 🌍 IMPACT SUMMARY */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">
          🌍 My Impact Summary
        </h2>

        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="bg-green-50 p-4 rounded">
            <p className="text-2xl font-bold">{totalReports}</p>
            <p className="text-sm text-gray-600">Reports Submitted</p>
          </div>

          <div className="bg-green-50 p-4 rounded">
            <p className="text-2xl font-bold">{cleanedCount}</p>
            <p className="text-sm text-gray-600">Issues Resolved</p>
          </div>

          <div className="bg-green-50 p-4 rounded">
            <p className="text-2xl font-bold">{greenPoints}</p>
            <p className="text-sm text-gray-600">Green Points</p>
          </div>

          <div className="bg-green-100 p-4 rounded font-semibold text-green-700">
            {badge}
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-4">
        {["All", "Pending", "In Progress", "Cleaned"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              filter === status
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* REPORTS TABLE */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">
          My Reports History
        </h2>

        {filteredReports.length === 0 ? (
          <p className="text-center text-gray-500">
            No reports found.
          </p>
        ) : (
          <table className="w-full border">
            <thead className="bg-green-100">
              <tr>
                <th className="border p-2">Location</th>
                <th className="border p-2">Waste Type</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr
                  key={report._id}
                  onClick={() => setSelectedReport(report)}
                  className="cursor-pointer hover:bg-green-50"
                >
                  <td className="border p-2">{report.location}</td>
                  <td className="border p-2">{report.type}</td>
                  <td className="border p-2 font-semibold">
                    {report.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 📄 REPORT DETAILS MODAL */}
      {selectedReport && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-green-700 mb-3">
              Report Details
            </h3>

            {selectedReport.image && (
              <img
                src={selectedReport.image}
                alt="Waste"
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}

            <p><b>📍 Location:</b> {selectedReport.location}</p>
            <p><b>🗑️ Type:</b> {selectedReport.type}</p>

            {selectedReport.description && (
              <p><b>📝 Description:</b> {selectedReport.description}</p>
            )}

            <p className="mt-2 font-semibold">
              Status: {selectedReport.status}
            </p>

            <div className="flex justify-between mt-4">
              {["Pending", "In Progress", "Cleaned"].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${getStepStyle(
                      selectedReport.status,
                      step
                    )}`}
                  />
                  <span className="text-xs mt-1">{step}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedReport(null)}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
