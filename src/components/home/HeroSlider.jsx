import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router";

const heroSlides = [
  {
    image: "https://7oroofthemes.com/agritec/wp-content/uploads/slider-1.webp",
    title: "Fresh Crops from Your Local Farmers",
    subtitle: "Buy and sell crops easily with Hero App Hub",
    cta: "Get Started",
    link: "/login", // add link for this slide
  },
  {
    image:
      "https://7oroofthemes.com/agritec/wp-content/uploads/banner-video-2.webp",
    title: "Connect with Trusted Farmers",
    subtitle: "Find the best quality crops in your area",
    cta: "Explore Now",
    link: "/allCrops", // add link for this slide
  },
  {
    image:
      "https://7oroofthemes.com/agritec/wp-content/uploads/bg-clients.webp",
    title: "Grow, Sell, Repeat",
    subtitle: "Manage your crops efficiently online",
    cta: "Join Today",
    link: "/login", // add link for this slide
  },
];

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setActiveSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  const nextSlide = () =>
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  const goToSlide = (index) => setActiveSlide(index);

  const currentSlide = heroSlides[activeSlide]; // get the active slide

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Slides */}
      <AnimatePresence>
        {heroSlides.map(
          (slide, index) =>
            index === activeSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-0 w-full h-full"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 flex flex-col justify-center items-center text-center px-4">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-2xl text-white mb-6">
                    {slide.subtitle}
                  </p>

                  {/* Dynamic Button */}
                  <Link
                    to={currentSlide.link}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition"
                  >
                    {currentSlide.cta}
                  </Link>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-20"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-20"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, idx) => (
          <span
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              idx === activeSlide ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-white z-20">
        <FaChevronDown size={24} />
      </div>
    </section>
  );
};

export default HeroSlider;
