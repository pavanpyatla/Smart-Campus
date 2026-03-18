import { useNavigate } from "react-router-dom";
import cleanImg from "../assets/clean-campus.jpg";

export default function Hero() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user");

  const handleReport = () => {
    if (isLoggedIn) {
      navigate("/report");
    } else {
      navigate("/login");
    }
  };

  const handleJoin = () => {
    navigate("/login");
  };

  return (
    <section
      id="home"
      className="max-w-6xl mx-auto px-10 pt-32 pb-24 grid md:grid-cols-2 gap-16 items-center"
    >
      {/* LEFT CONTENT */}
      <div>
        <h2 className="text-5xl font-extrabold mb-6">
          Cleanify Campus
        </h2>

        <p className="text-2xl font-semibold text-green-600 mb-4">
          Smart Waste Management for a Cleaner, Greener Campus
        </p>

        <p className="text-lg text-gray-600 mb-8">
          Report waste, track cleanliness, and make your campus sustainable —
          all in one platform.
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleReport}
            className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition active:scale-95"
          >
            Report Waste
          </button>

          <button
            onClick={handleJoin}
            className="border border-green-600 text-green-600 px-6 py-3 rounded-md font-semibold hover:bg-green-50 transition"
          >
            Join Cleanify
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <img
        src={cleanImg}
        alt="Clean Campus"
        className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
      />
    </section>
  );
}
