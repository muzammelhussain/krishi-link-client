import React from "react";
import { motion } from "framer-motion";
import {
  FaTractor,
  FaHandshake,
  FaChartLine,
  FaShieldAlt,
  FaExchangeAlt,
} from "react-icons/fa";

const services = [
  {
    icon: <FaTractor />,
    title: "Crop Listing Service",
    description:
      "Farmers can easily list crops with price, quantity, and location details for buyers to explore.",
  },
  {
    icon: <FaHandshake />,
    title: "Buyer–Farmer Matching",
    description:
      "Connects buyers with farmers through a smart interest-based matching system.",
  },
  {
    icon: <FaExchangeAlt />,
    title: "Real-Time Trade Management",
    description:
      "Track interests, accept or reject requests, and manage crop quantities in real time.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Online Interaction",
    description:
      "JWT-secured authentication ensures safe communication and data protection.",
  },
  {
    icon: <FaChartLine />,
    title: "Data-Driven Decision Support",
    description:
      "Provides insights from crop data to help users make informed trading decisions.",
  },
];

// Framer Motion variants
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
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

const ServicesSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-500"
    >
      {/* Decorative Background Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200 dark:bg-green-700 rounded-full opacity-20 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div variants={cardVariant} className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-500">
            Our Services
          </h2>
          <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-500">
            We provide smart, secure, and efficient services to streamline crop
            trading and build strong buyer–farmer connections.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              whileHover={{ scale: 1.05, y: -5, rotateX: 5, rotateY: 5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg dark:shadow-xl transition-all cursor-pointer flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Floating Icon Animation */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2 + index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-primary dark:text-yellow-400 text-5xl mb-4 transition-colors duration-300"
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                {service.description}
              </p>

              {/* Optional Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-green-300 to-yellow-300 opacity-0 hover:opacity-20 rounded-3xl pointer-events-none transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;
