import React, { useState } from "react";

const TestimonialCard = ({ testimonial, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="p-6 bg-white rounded-lg shadow cursor-pointer 
        transform transition duration-300 hover:scale-105 animate-slideUp"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <p className="text-gray-700">
        {expanded ? testimonial.text : testimonial.text.slice(0, 100) + "..."}
      </p>
      <p className="mt-2 font-semibold text-green-700">
        — {testimonial.author}
      </p>
      {testimonial.text.length > 100 && (
        <button
          className="mt-2 text-sm text-green-800 font-medium hover:underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default TestimonialCard;
