import React, { useState, useEffect } from "react";

const heroSlides = [
  {
    image: "https://7oroofthemes.com/agritec/wp-content/uploads/slider-1.webp",
    title: "Fresh Crops from Your Local Farmers",
    subtitle: "Buy and sell crops easily with Hero App Hub",
  },
  {
    image:
      "https://7oroofthemes.com/agritec/wp-content/uploads/banner-video-2.webp",
    title: "Connect with Trusted Farmers",
    subtitle: "Find the best quality crops in your area",
  },
  {
    image:
      "https://7oroofthemes.com/agritec/wp-content/uploads/bg-clients.webp",
    title: "Grow, Sell, Repeat",
    subtitle: "Manage your crops efficiently online",
  },
];

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

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

  return (
    <section className="relative w-full h-[300px] md:h-[650px] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
            index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
            <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
            <p className="text-xl">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-opacity-40 text-[#FFFFFF] p-2 rounded-full hover:bg-opacity-70"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70"
      >
        &#10095;
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, idx) => (
          <span
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              idx === activeSlide ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
