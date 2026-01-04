import React from "react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaSeedling,
  FaTractor,
  FaAppleAlt,
  FaCarrot,
  FaWater,
  FaSun,
} from "react-icons/fa";

// Bottom icons data
const bottomIcons = [
  { label: "NatureNest", icon: FaLeaf },
  { label: "Farming", icon: FaTractor },
  { label: "GreenLeaf", icon: FaSeedling },
  { label: "PureHarvest", icon: FaAppleAlt },
  { label: "Organic Veg", icon: FaCarrot },
  { label: "Irrigation", icon: FaWater },
  { label: "Sun Growth", icon: FaSun },
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const CategoriesSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="py-20"
    >
      <div className="bg-base-100 min-h-screen py-20 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            className="text-center mb-16 text-base-content"
          >
            <p className="text-primary text-sm tracking-widest uppercase">
              Agri Intelligence
            </p>
            <h1 className="text-5xl md:text-6xl font-extrabold mt-2 leading-tight">
              From Soil to Soul, We Grow Naturally
            </h1>
          </motion.div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between text-base-content">
            {/* Left */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/3 text-center lg:text-left order-2 lg:order-1 mt-12 lg:mt-0"
            >
              <h2 className="text-2xl font-semibold mt-8">
                Data-Driven Agricultural
              </h2>
              <p className="text-gray-400 max-w-sm lg:max-w-none mx-auto lg:mx-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-sm bg-green-400  text-neutral hover:bg-yellow-500 hover:border-yellow-500 mt-6 px-6 gap-2"
              >
                More Details
              </motion.button>
            </motion.div>

            {/* Center Image (Static) */}
            <div className="w-full lg:w-1/3 flex justify-center order-1 lg:order-2">
              <img
                src="https://agrezen.zozothemes.com/wp-content/uploads/2025/10/shape-15-1200x1177.webp"
                alt="Cyclic Diagram of Agricultural Stages"
                className="w-full max-w-xs sm:max-w-sm h-auto opacity-90 transition-opacity duration-1000 hover:opacity-100"
              />
            </div>

            {/* Right */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/3 text-center lg:text-right order-3 mt-12 lg:mt-0"
            >
              <h2 className="text-2xl font-semibold mt-8">Planting Material</h2>
              <p className="text-gray-400 max-w-sm lg:max-w-none mx-auto lg:mx-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </motion.div>
          </div>

          {/* Bottom Icons */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-x-10 gap-y-6 mt-20 opacity-70"
          >
            {bottomIcons.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ scale: 1.1, color: "#facc15" }}
                  className="flex flex-col items-center text-[green] text-sm font-semibold cursor-pointer"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 2 + index * 0.2, // staggered float
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon className="h-8 w-8 mb-1" />
                  </motion.div>
                  {item.label}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CategoriesSection;
