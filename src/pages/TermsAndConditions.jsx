import React from "react";

const TermsAndConditions = () => {
  // Policy details categorized for easy rendering
  const policyDetails = [
    {
      title: "User Responsibility",
      content: "Users must provide accurate information.",
    },
    {
      title: "Farmer Responsibility",
      content: "Farmers are responsible for crop details.",
    },
    {
      title: "Buyer Responsibility",
      content: "Buyers must send genuine interest requests.",
    },
    {
      title: "Platform Misuse",
      content:
        "Any misuse or fraudulent activity may result in account suspension.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 bg-base-100 rounded-lg shadow-lg">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-neutral mb-2">
        Terms of Use 📜
      </h1>
      <p className="text-lg text-secondary mb-8">
        By using KrishiLink, you agree to the following terms:
      </p>

      {/* Terms List */}
      <div className="space-y-6">
        {policyDetails.map((item, index) => (
          <div key={index} className="flex items-start">
            <span className="text-2xl text-primary mr-3 mt-1">
              {/* Using DaisyUI badge/indicator style for styling bullet points */}
              &bull;
            </span>
            <div>
              <h3 className="text-xl font-semibold text-neutral-focus">
                {item.title}
              </h3>
              <p className="mt-1 text-base">{item.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Update Clause */}
      <div className="mt-10 p-4 border-l-4 border-accent bg-base-200 rounded">
        <p className="font-medium text-sm">
          **Update Policy:** KrishiLink reserves the right to update these terms
          at any time to improve platform safety and performance.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
