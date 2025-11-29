import React from "react";

const FeaturedServices = () => (
  <section className="py-24 bg-gradient-to-r from-green-200 via-green-100 to-yellow-100">
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-12 text-center animate-fadeIn">
        Our Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Crop Marketplace",
            desc: "Buy and sell crops online safely and easily.",
          },
          {
            title: "Farm Management",
            desc: "Manage your crops, inventory, and sales efficiently.",
          },
          {
            title: "Agro Education",
            desc: "Learn best practices and latest farming techniques.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow cursor-pointer 
              transform transition duration-300 hover:scale-105 animate-slideUp"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <h3 className="font-bold mb-2 text-green-700">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedServices;
