import React, { useState } from "react";

const testimonialsData = [
  {
    text: "Hero App Hub helped me sell my crops faster than ever! I was able to connect with buyers in my area and manage orders easily. The platform is user-friendly and efficient, making crop sales simple and hassle-free.",
    author: "Akash Lal",
  },
  {
    text: "Finding fresh vegetables from local farmers is so easy now. I can browse a variety of crops, compare prices, and order directly online. It has truly changed the way I shop for groceries.",
    author: "Dilip Lowre",
  },
  {
    text: "Great platform for connecting farmers and buyers. It provides transparency, easy communication, and timely updates on market trends. Highly recommended for anyone in the agriculture business.",
    author: "Roton Pandy",
  },
];

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

const Testimonials = () => (
  <section className="py-12 bg-gradient-to-r from-green-100 via-green-50 to-yellow-50">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-12 animate-fadeIn">Testimonials</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonialsData.map((item, index) => (
          <TestimonialCard key={index} testimonial={item} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
