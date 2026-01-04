import React from "react";
import { motion } from "framer-motion";

const newsItems = [
  {
    title: "New Crop Season Updates",
    desc: "Learn about upcoming seasonal crops and planting schedules.",
  },
  {
    title: "Sustainable Farming Tips",
    desc: "Reduce waste and increase yield with smart farming techniques.",
  },
  {
    title: "Market Price Trends",
    desc: "Check updated crop prices and demand trends in your area.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const AgroNews = () => (
  <section
    className="py-16 relative"
    style={{
      backgroundImage:
        "url('https://7oroofthemes.com/agritec/wp-content/uploads/bg-contact.webp')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 pointer-events-none"></div>

    <div className="relative max-w-6xl mx-auto px-6">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-12 text-center text-white dark:text-green-200"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Agro News
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newsItems.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-6 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg dark:shadow-xl text-center cursor-pointer relative overflow-hidden transition-colors duration-500"
          >
            {/* Hover glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-200 via-yellow-200 to-green-300 opacity-0 hover:opacity-20 rounded-3xl pointer-events-none transition-opacity duration-500"></div>

            <h3 className="font-bold mb-3 text-lg text-green-700 dark:text-green-300 transition-colors duration-500">
              {item.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-200 transition-colors duration-500">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AgroNews;
