
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyCleanify from "../components/WhyCleanify";
import BeforeAfter from "../components/BeforeAfter";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <Hero />
      <WhyCleanify />
      <BeforeAfter />
      <FAQ />
      <Footer />
    </div>
  );
}
