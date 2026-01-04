import React from "react";
import { FaLeaf, FaArrowRight } from "react-icons/fa";

const blogs = [
  {
    title: "Benefits of Digital Crop Trading",
    description:
      "Digital crop trading empowers farmers with transparency, faster deals, and better market access without intermediaries.",
    icon: <FaLeaf />,
    gradient: "from-green-500 to-lime-500",
  },
  {
    title: "Fair Pricing in Modern Agriculture",
    description:
      "Technology ensures fair pricing by enabling direct buyer-farmer connections and real-time market insights.",
    icon: <FaLeaf />,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Agri-Tech Future in Bangladesh",
    description:
      "Agri-tech is reshaping Bangladesh’s agriculture with smarter trading, data-driven decisions, and sustainability.",
    icon: <FaLeaf />,
    gradient: "from-green-600 to-green-400",
  },
];

const BlogSection = () => {
  return (
    <section className="my-32 px-4 relative">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 via-transparent to-green-100/30 blur-3xl -z-10"></div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <h2 className="text-4xl font-extrabold mb-4">
          Insights from the Field 🌾
        </h2>
        <p className="text-gray-500">
          Knowledge, innovation, and ideas shaping the future of digital
          agriculture.
        </p>
      </div>

      {/* Timeline Cards */}
      <div className="max-w-5xl mx-auto space-y-10 relative">
        {/* Vertical Line */}
        <div className="absolute left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-lime-500 rounded-full"></div>

        {blogs.map((blog, index) => (
          <div key={index} className="flex gap-6 group">
            {/* Icon */}
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full text-white bg-gradient-to-r ${blog.gradient} shadow-lg group-hover:scale-110 transition`}
            >
              {blog.icon}
            </div>

            {/* Glass Card */}
            <div className="flex-1 bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
              <h3 className="text-2xl font-bold mb-3">{blog.title}</h3>
              <p className="text-gray-600 mb-5">{blog.description}</p>

              <button className="inline-flex items-center gap-2 font-semibold text-green-600 group-hover:gap-3 transition-all">
                Explore Insight <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
