import { useState } from "react";

const faqs = [
  {
    question: "What is Cleanify Campus?",
    answer:
      "Cleanify Campus is a student-driven platform that helps report, track, and resolve cleanliness issues on campus efficiently."
  },
  {
    question: "How can I report a waste issue?",
    answer:
      "You can report waste by uploading a photo and location through the Report Waste section after logging in."
  },
  {
    question: "Who resolves the reported issues?",
    answer:
      "Campus cleaning staff or assigned volunteers handle the issue after admin verification."
  },
  {
    question: "Is Cleanify Campus free to use?",
    answer:
      "Yes, Cleanify Campus is completely free for students and staff."
  },
  {
    question: "Can students become volunteers?",
    answer:
      "Yes! Students can register as volunteers and actively contribute to campus cleanliness."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-green-50">
      <div className="max-w-5xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-16">
          <h3 className="text-5xl font-extrabold mb-4 text-gray-900">
            Frequently Asked Questions
          </h3>
          <p className="text-lg text-gray-600">
            Everything you need to know about Cleanify Campus
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-green-100 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* QUESTION */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>

                <span
                  className={`text-3xl font-bold transition-transform duration-300 ${
                    activeIndex === index
                      ? "rotate-45 text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  +
                </span>
              </button>

              {/* ANSWER */}
              <div
                className={`px-6 overflow-hidden transition-all duration-500 ${
                  activeIndex === index
                    ? "max-h-40 pb-5 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
