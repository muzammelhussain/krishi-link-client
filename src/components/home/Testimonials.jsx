import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./TestimonialCard";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Testimonials = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <section className="relative py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 overflow-hidden">
      {/* Decorative Floating Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 dark:bg-green-700 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-20 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* Header */}
      <div className="text-center mb-20 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-500">
          Our Customers Speak
        </h2>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-500">
          Our customers are at the heart of everything we do, and their feedback
          helps us grow. Read real reviews from people who have experienced our
          service firsthand. Their honest opinions inspire us to deliver the
          best possible service.
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.2} // smaller width for mobile, adjust via breakpoints
        spaceBetween={30}
        breakpoints={{
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
        }}
        coverflowEffect={{
          rotate: 20,
          stretch: 40,
          depth: 150,
          modifier: 1,
          scale: 0.85,
          slideShadows: false,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper max-w-6xl mx-auto px-6"
      >
        {reviews.map((review, i) => (
          <SwiperSlide key={review.id}>
            <div className="relative">
              <TestimonialCard review={review} />
              {/* Floating gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-green-300 via-yellow-300 to-green-300 opacity-10 rounded-3xl pointer-events-none animate-pulse"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
