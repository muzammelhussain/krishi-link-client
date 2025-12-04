import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ review }) => {
  const fallbackImage = "https://i.ibb.co.com/m5WJ86XJ/user.png";

  const { userName, review: testimonial, user_photoURL } = review;

  return (
    <div className="max-w-sm bg-amber-100 shadow-lg rounded-xl p-6 border border-gray-200">
      <FaQuoteLeft className="text-primary text-2xl mb-4" />

      <p className="mb-4">{testimonial}</p>

      <div className="border-t border-dashed border-gray-300 my-4"></div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border hidden md:block">
          <img
            src={user_photoURL || fallbackImage}
            alt={userName}
            className="w-full h-full object-cover "
          />
        </div>

        <div>
          <h3 className="font-semibold text-lg">{userName}</h3>
          <p className="text-sm text-gray-500">Verified Customer</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
