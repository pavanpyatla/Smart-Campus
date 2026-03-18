import beforeImg from "../assets/before.png";
import afterImg from "../assets/after.png";
import beforeImg2 from "../assets/before2.png";
import afterImg2 from "../assets/after2.png";

export default function BeforeAfter() {
  return (
    <section className="py-20 bg-white" id="impact">
      <div className="max-w-7xl mx-auto px-7">

        {/* HEADING */}
        <div className="text-center mb-16">
          <h3 className="text-5xl font-extrabold mb-4">
            Before & After
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real campus transformations powered by student reporting
            and quick action through Cleanify Campus.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid sm:grid-cols-2 gap-10 justify-center">

          {/* CARD 1 */}
          <div className="max-w-[420px] mx-auto rounded-2xl overflow-hidden shadow-lg border border-green-100 bg-white hover:shadow-xl transition">
            <div className="grid grid-cols-2">

              {/* BEFORE */}
              <div className="relative aspect-[9/15]">
                <img
                  src={beforeImg}
                  alt="Before Cleanup"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                  Before
                </span>
              </div>

              {/* AFTER */}
              <div className="relative aspect-[9/15]">
                <img
                  src={afterImg}
                  alt="After Cleanup"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                  After
                </span>
              </div>

            </div>

            <div className="p-3">
              <h4 className="text-lg font-bold mb-2">
                Hostel Waste Cleanup
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Waste near hostel blocks was reported and resolved within hours
                using Cleanify Campus.
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="max-w-[420px] mx-auto rounded-2xl overflow-hidden shadow-lg border border-green-100 bg-white hover:shadow-xl transition">
            <div className="grid grid-cols-2">

              {/* BEFORE */}
              <div className="relative aspect-[9/15]">
                <img
                  src={beforeImg2}
                  alt="Before Cleanup"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                  Before
                </span>
              </div>

              {/* AFTER */}
              <div className="relative aspect-[9/15]">
                <img
                  src={afterImg2}
                  alt="After Cleanup"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                  After
                </span>
              </div>

            </div>

            <div className="p-3">
              <h4 className="text-lg font-bold mb-2">
                Blocks Area Restoration
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Blocks surroundings were cleaned quickly after student reports.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
