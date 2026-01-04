import React from "react";

const HelpAndSupport = () => {
  const commonQuestions = [
    "How do I post a crop?",
    "How can I send an interest request?",
    "Why can’t I request my own crop?",
    "How does quantity update work?",
    "How do I accept or reject buyer interests?",
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-400 sm:text-4xl">
          How Can We Help You? 
        </h1>
        <p className="mt-3 text-lg text-gray-300">
          If you’re facing any issues or have questions, check the topics below:
        </p>
      </div>

      {/* Common Questions List (Using a simple list here; in DaisyUI you would use the 'collapse' component) */}
      <div className="max-w-3xl mx-auto space-y-4">
        {commonQuestions.map((question, index) => (
          <div
            key={index}
            className="p-4 bg-base-100 shadow-md rounded-lg border border-base-300 hover:border-accent transition-colors cursor-pointer"
          >
            <span className="font-semibold text-neutral-focus">
              {index + 1}. {question}
            </span>
          </div>
        ))}
      </div>

      {/* Need More Help Section */}
      <div className="mt-10 text-center p-6 bg-base-100 text-base-content rounded-lg shadow-xl">
        <h3 className="text-xl font-bold mb-2">Need More Help?</h3>
        <p className="text-lg">
          If your issue is not listed, please contact our support team via the{" "}
          <a
            href="/contact-us"
            className="underline font-semibold hover:text-green-400 transition-colors"
          >
            Contact page
          </a>
          . We’re here to help you.
        </p>
      </div>
    </div>
  );
};

export default HelpAndSupport;
