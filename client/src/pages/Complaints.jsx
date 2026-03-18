import { useState, useEffect, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { PlusCircle, Image as ImageIcon, Loader2, AlertTriangle, FileWarning } from "lucide-react";
import toast from "react-hot-toast";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", location: "", image: null });
  const [loading, setLoading] = useState(false);
  const { user, addActivity } = useContext(AuthContext);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints");
      setComplaints(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await api.post("/complaints", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      addActivity(`Complaint submitted: ${formData.title}`, "complaint");
      setFormData({ title: "", description: "", location: "", image: null });
      fetchComplaints();
      toast.success("Complaint submitted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unable to submit complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/complaints/${id}/status`, { status });
      fetchComplaints();
      toast.success(`Complaint marked as ${status}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  const statusColors = {
    "Submitted": "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    "Resolved": "bg-green-100 text-green-800"
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Complaint Reporting</h1>
          <p className="mt-2 text-indigo-100 text-lg">Report campus maintenance or cleanliness issues and track their resolution.</p>
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Form Container */}
        {(user?.role === "student" || user?.role === "admin") && (
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 top-24 sticky">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Submit a Complaint</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Complaint Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Broken projector in Room 101"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Block A, 2nd Floor"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                  <textarea
                    placeholder="Provide details about the issue..."
                    required
                    rows="4"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors group">
                    <div className="flex items-center space-x-2 text-gray-500 group-hover:text-indigo-600">
                      <ImageIcon className="w-5 h-5" />
                      <span className="font-medium text-sm">Upload Image (Optional)</span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    />
                  </label>
                  {formData.image && <p className="text-xs text-green-600 dark:text-green-400 font-medium truncate px-1">Selected: {formData.image.name}</p>}
                </div>

                <button disabled={loading} type="submit" className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all disabled:opacity-50">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Submit Report</span>}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Right Side: Feed Container */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 min-h-[500px]">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Complaints</h2>
             
            {complaints.length === 0 ? (
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-10 flex flex-col items-center justify-center text-center">
                 <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-full mb-4">
                   <FileWarning className="w-10 h-10 text-gray-400" />
                 </div>
                 <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">No complaints submitted yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {complaints.map((c) => (
                  <div key={c._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800/50">
                    <div className="flex flex-col sm:flex-row gap-5">
                      {c.image && (
                        <img src={`http://localhost:5000${c.image}`} alt={c.title} className="w-full sm:w-32 h-24 object-cover rounded-md shadow-sm border border-gray-100 dark:border-gray-700 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-3">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{c.title}</h3>
                            <span className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                              {c.status}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-2">{c.description}</p>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 dark:border-gray-700 pt-3">
                          <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">📍 {c.location}</span>
                            <span className="flex items-center gap-1">🗓️ {new Date(c.createdAt).toLocaleDateString()}</span>
                          </div>
                          {user?.role === "admin" && (
                            <div className="flex gap-2">
                              <button onClick={() => updateStatus(c._id, "In Progress")} className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">Process</button>
                              <button onClick={() => updateStatus(c._id, "Resolved")} className="px-3 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors">Resolve</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
