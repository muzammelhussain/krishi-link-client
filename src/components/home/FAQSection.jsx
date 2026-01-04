import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Who can use KrishiLink?",
    answer:
      "KrishiLink is designed for farmers, buyers, and agricultural businesses. Farmers can post crops, while buyers can explore listings and send purchase interests.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. KrishiLink uses secure authentication (JWT) and protected APIs to ensure your personal and transactional data remains safe.",
  },
  {
    question: "How does interest acceptance work?",
    answer:
      "Buyers can send interest requests for a crop. The crop owner can accept or reject the request. Once accepted, the crop quantity is updated automatically.",
  },
  {
    question: "Can I cancel an interest request?",
    answer:
      "Currently, interest requests cannot be canceled once submitted. However, rejected or pending interests are clearly shown in your dashboard.",
  },
  {
    question: "How is quantity managed?",
    answer:
      "When an interest is accepted, the requested quantity is automatically deducted from the available crop quantity to ensure accurate stock management.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="my-32 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500">
          Everything you need to know about using KrishiLink
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border-2 border-transparent bg-gradient-to-r from-green-100 via-white to-blue-100 rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-5 font-semibold text-left hover:bg-gray-50 transition-colors duration-300"
            >
              {faq.question}
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="px-5 pb-5 text-gray-700 leading-relaxed"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
