import React, { use } from "react";

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./TestimonialCard";
import Test from "../../pages/Test";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Testimonials = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);
  return (
    <div className="my-24">
      <div className="text-center mb-24  w-full md:w-2/3 mx-auto ">
        <h1 className="text-3xl text-center font-bold my-8 text-green-300">
          Review
        </h1>
        <p className="">
          **Our customers are at the heart of everything we do, and their
          feedback helps us grow and improve. you can read real reviews from
          people who have experienced our service firsthand. Their honest
          opinions, experiences, and satisfaction reflect our commitment to
          quality and reliability. We value every review, as it inspires us to
          continue delivering the best possible service to all our users.**
        </p>
      </div>

      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper w-full md:w-2/3 mx-auto"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <TestimonialCard review={review}></TestimonialCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
