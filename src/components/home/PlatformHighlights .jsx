import React from "react";
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaSyncAlt,
  FaLock,
  FaAdjust,
  FaDatabase,
} from "react-icons/fa";

const highlights = [
  {
    title: "Role-Based Access Control",
    description:
      "Separate dashboards and permissions for farmers, buyers, and admins to ensure secure access.",
    icon: <FaUserShield />,
  },
  {
    title: "Real-Time Data Consistency",
    description:
      "Live updates keep crop quantities, interests, and statuses accurate across the platform.",
    icon: <FaSyncAlt />,
  },
  {
    title: "Secure REST APIs",
    description:
      "JWT-protected APIs ensure safe and authenticated communication between client and server.",
    icon: <FaLock />,
  },
  {
    title: "Clean UI with Light/Dark Mode",
    description:
      "Modern, accessible design with theme switching for better user experience.",
    icon: <FaAdjust />,
  },
  {
    title: "Optimized Database Queries",
    description:
      "Efficient MongoDB queries reduce load time and improve overall performance.",
    icon: <FaDatabase />,
  },
];

// Framer Motion Variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const iconVariant = {
  hover: {
    scale: 1.3,
    rotate: [0, 10, -10, 0],
    transition: { duration: 0.6, repeat: Infinity, repeatType: "loop" },
  },
};

const PlatformHighlights = () => {
  return (
    <motion.section
      className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-500"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
    >
      {/* Decorative Background Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200 dark:bg-green-700 rounded-full opacity-20 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div variants={cardVariant} className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-500">
            Platform Highlights
          </h2>
          <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-500">
            Built with performance, security, and user experience in mind.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              whileHover={{ scale: 1.05, y: -5, rotateX: 5, rotateY: 5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg dark:shadow-xl transition-all cursor-pointer flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Floating Icon */}
              <motion.div
                whileHover="hover"
                variants={iconVariant}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2 + index * 0.2, repeat: Infinity }}
                className="text-primary dark:text-yellow-400 text-5xl mb-4 transition-colors duration-300"
              >
                {item.icon}
              </motion.div>

              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                {item.description}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-green-300 to-yellow-300 opacity-0 hover:opacity-20 rounded-3xl pointer-events-none transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PlatformHighlights;
