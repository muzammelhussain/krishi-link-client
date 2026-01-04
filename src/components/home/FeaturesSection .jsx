import React from "react";
import { motion } from "framer-motion";
import {
  FaLock,
  FaSeedling,
  FaUsers,
  FaSyncAlt,
  FaSortAmountDown,
  FaMobileAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaLock />,
    title: "Secure Authentication",
    description:
      "JWT-based authentication ensures secure login and protected routes.",
  },
  {
    icon: <FaSeedling />,
    title: "Crop Posting & Management",
    description: "Farmers can easily add, update, and manage crop listings.",
  },
  {
    icon: <FaUsers />,
    title: "Buyer Interest System",
    description:
      "Buyers can send interest requests and communicate with crop owners.",
  },
  {
    icon: <FaSyncAlt />,
    title: "Automatic Quantity Updates",
    description:
      "Crop quantity updates automatically when interests are accepted.",
  },
  {
    icon: <FaSortAmountDown />,
    title: "Sorting & Filtering",
    description:
      "Sort and filter crops easily by price, quantity, and category.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Responsive UI",
    description:
      "Fully responsive design optimized for mobile, tablet, and desktop.",
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

const FeaturesSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      className="py-20 bg-base-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={cardVariant} className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Powerful tools designed to simplify crop trading, ensure security,
            and enhance user experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col items-center text-center"
            >
              <div className="text-primary text-5xl mb-4 transition-colors duration-300 hover:text-yellow-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
