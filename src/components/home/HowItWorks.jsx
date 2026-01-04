import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const HowItWorks = () => {
  const steps = [
    {
      title: "1. Register",
      desc: "Create an account to buy or sell crops easily.",
    },
    {
      title: "2. Browse Crops",
      desc: "Explore crops available from farmers near you.",
    },
    {
      title: "3. Buy & Sell",
      desc: "Place orders, negotiate prices, and manage your crops.",
    },
  ];

  return (
    <section className="relative bg-gray-100 dark:bg-gray-900 py-16 transition-colors duration-500 overflow-hidden">
      {/* Background circles for style */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200 dark:bg-green-700 rounded-full opacity-20 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10 px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white transition-colors duration-500"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                rotateZ: 1.5,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-xl cursor-pointer relative overflow-hidden transition-colors duration-500"
            >
              {/* Optional hover gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300 via-green-300 to-yellow-300 opacity-0 hover:opacity-20 rounded-3xl pointer-events-none transition-opacity duration-500"></div>

              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900 dark:text-white transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-500">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
