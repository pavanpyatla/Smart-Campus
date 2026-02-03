import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReportIssue = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [location, setLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");

  const [type, setType] = useState("");
  const [customType, setCustomType] = useState("");

  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      alert("Image must be under 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.email) {
      alert("Please login again");
      navigate("/login");
      return;
    }

    const finalLocation =
      location === "Other" ? customLocation.trim() : location;

    const finalType =
      type === "Other" ? customType.trim() : type;

    if (!finalLocation || !finalType) {
      alert("Please fill all required fields");
      setLoading(false);
      return;
    }

    const reportData = {
      location: finalLocation,
      type: finalType,
      description,
      image: image,
      userEmail: user.email,
    };

    try {
      const res = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Backend error:", data);
        throw new Error("Submit failed");
      }

      // ✅ IMPORTANT FIX: NO replace:true
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 pt-28 pb-20 px-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-green-700 mb-2">
          Report Waste 🗑️
        </h2>
        <p className="text-gray-600 mb-8">
          Upload a photo and help keep our campus clean
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Upload Waste Image (Optional)
            </label>

            <div className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center hover:bg-green-50 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="cursor-pointer">
                {!preview ? (
                  <p className="text-gray-500">📷 Click to upload image</p>
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mx-auto max-h-48 rounded-lg shadow"
                  />
                )}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Location
            </label>
            <select
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select location</option>
              <option value="Hostel">Hostel</option>
              <option value="Canteen">Canteen</option>
              <option value="Block">Block</option>
              <option value="Other">Other</option>
            </select>

            {location === "Other" && (
              <input
                type="text"
                required
                placeholder="Enter location"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                className="mt-3 w-full border rounded-lg p-3"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Waste Type
            </label>
            <select
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select waste type</option>
              <option value="Plastic">Plastic</option>
              <option value="Food Waste">Food Waste</option>
              <option value="E-Waste">E-Waste</option>
              <option value="Other">Other</option>
            </select>

            {type === "Other" && (
              <input
                type="text"
                required
                placeholder="Enter waste type"
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                className="mt-3 w-full border rounded-lg p-3"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Description (Optional)
            </label>
            <textarea
              rows="3"
              placeholder="Briefly describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-3 resize-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition active:scale-95 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
