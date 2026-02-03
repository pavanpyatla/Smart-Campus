export default function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16">

        <div className="grid gap-14 sm:grid-cols-2 md:grid-cols-4">

          {/* BRAND */}
          <div>
            <h2 className="text-white text-3xl font-extrabold mb-5 flex items-center gap-2">
              🌱 Cleanify Campus
            </h2>

            <p className="text-sm leading-relaxed">
              A student-driven initiative to report waste issues, track
              cleanliness, and build a greener, more sustainable campus.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-5 mt-6 text-xl">
              <a href="#" aria-label="Twitter" className="hover:text-white transition">
                🐦
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white transition">
                📸
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white transition">
                💼
              </a>
            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Navigation
            </h3>

            <ul className="space-y-3 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="/report" className="hover:text-white transition">Report Waste</a></li>
              <li><a href="/login" className="hover:text-white transition">Login</a></li>
            </ul>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Platform
            </h3>

            <ul className="space-y-3 text-sm">
              <li>📸 Waste Reporting</li>
              <li>⏱ Real-Time Tracking</li>
              <li>🧹 Smart Cleaning Assignment</li>
              <li>🌱 Impact Analytics</li>
              <li>👥 Student Participation</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Contact
            </h3>

            <p className="text-sm mb-2">
              📧 cleanify@campus.edu
            </p>
            <p className="text-sm mb-2">
              📞 +91 XXXXX XXXXX
            </p>
            <p className="text-sm">
              🏫 Campus Sustainability Cell
            </p>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 mt-20"></div>

        {/* COPYRIGHT */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Cleanify Campus. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
