import React from "react";

const BlogTopics = () => {
  const latestTopics = [
    "How digital platforms are transforming agriculture",
    "Tips for farmers to get better crop prices",
    "Secure online trading: what buyers should know",
    "Future of agri-tech in developing countries",
  ];

  return (
    <div className="card max-w-7xl mx-auto bg-base-100  border border-base-100 p-6">
      {/* Header */}
      <h2 className="card-title text-2xl text-green-400 mb-2">
        KrishiLink Blog 📰
      </h2>
      <p className="mb-6 text-sm">
        Welcome to the KrishiLink Blog — your source for updates, insights, and
        stories related to agriculture, technology, and digital marketplaces.
      </p>

      {/* Latest Topics List */}
      <h3 className="font-semibold text-green-400 mb-3">Latest Topics</h3>
      <ul className="list-none space-y-2">
        {latestTopics.map((topic, index) => (
          <li key={index} className="flex items-start text-base">
            <span className="text-secondary mr-2 mt-1">&gt;</span>
            <span className="hover:text-green-300 transition-colors cursor-pointer">
              {topic}
            </span>
          </li>
        ))}
      </ul>

      {/* Call to Action */}
      <div className="mt-6 p-3 bg-base-200 rounded">
        <p className="text-sm">
          We regularly share articles to help farmers and buyers make informed
          decisions and stay updated with industry trends.
        </p>
      </div>
    </div>
  );
};

export default BlogTopics;
