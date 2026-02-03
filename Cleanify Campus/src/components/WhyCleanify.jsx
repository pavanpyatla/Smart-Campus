import { useEffect } from "react";
import reportImg from "../assets/waste-report.jpg";
import trackImg from "../assets/tracking.jpg";
import communityImg from "../assets/community.jpg";

export default function WhyCleanify() {

  /* CARD SCROLL ANIMATION */
  useEffect(() => {
    const cards = document.querySelectorAll(".why-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="py-28 bg-green-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-10 text-center">

        {/* HEADING */}
        <h3 className="text-5xl font-extrabold text-gray-900 mb-6">
          Why Cleanify Campus?
        </h3>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-20">
          Cleanify Campus solves real campus cleanliness problems by combining
          technology, transparency, and student participation.
        </p>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* CARD 1 */}
          <div className="why-card bg-white rounded-3xl overflow-hidden shadow-lg border border-green-100 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl">

            <div className="h-52 bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center overflow-hidden">
              <img
                src={reportImg}
                alt="Easy Waste Reporting"
                className="h-34 object-contain drop-shadow-xl brightness-90 transition-transform duration-500 hover:scale-110"
              />
            </div>

            <div className="p-8 text-left">
              <h4 className="text-2xl font-bold mb-3 text-gray-900">
                Easy Waste Reporting
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Students can instantly report waste issues using photos and
                location, ensuring problems are noticed and acted upon quickly.
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="why-card bg-white rounded-3xl overflow-hidden shadow-lg border border-green-100 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl">

            <div className="h-52 bg-gradient-to-br from-green-700 to-green-500 flex items-center justify-center overflow-hidden">
              <img
                src={trackImg}
                alt="Transparent Tracking"
                className="h-34 object-contain drop-shadow-xl brightness-90 transition-transform duration-500 hover:scale-110"
              />
            </div>

            <div className="p-8 text-left">
              <h4 className="text-2xl font-bold mb-3 text-gray-900">
                Transparent Tracking
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Every report is tracked in real-time from submission to
                resolution, bringing transparency and accountability.
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="why-card bg-white rounded-3xl overflow-hidden shadow-lg border border-green-100 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl">

            <div className="h-52 bg-gradient-to-br from-green-800 to-green-600 flex items-center justify-center overflow-hidden">
              <img
                src={communityImg}
                alt="Community Driven"
                className="h-34 object-contain drop-shadow-xl brightness-90 transition-transform duration-500 hover:scale-110"
              />
            </div>

            <div className="p-8 text-left">
              <h4 className="text-2xl font-bold mb-3 text-gray-900">
                Community-Driven Cleanliness
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Cleanify connects students, staff, and admins to build a shared
                responsibility for a cleaner and greener campus.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
