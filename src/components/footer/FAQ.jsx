import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How does KrishiLink work?",
    answer:
      "KrishiLink connects farmers and buyers through a digital marketplace where crops can be listed, discovered, and traded easily.",
  },
  {
    question: "Is KrishiLink free for farmers?",
    answer:
      "Yes, farmers can list crops and receive interests for free. Premium services may be added in the future.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact us via email at support@krishilink.com or through the contact page.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-10 ">Frequently Asked Questions</h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg p-5 cursor-pointer bg-base-200 shadow-sm text-green-400"
            onClick={() =>
              setActiveIndex(activeIndex === index ? null : index)
            }
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{faq.question}</h3>
              <FaChevronDown
                className={`transition ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {activeIndex === index && (
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
