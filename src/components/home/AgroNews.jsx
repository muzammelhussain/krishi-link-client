import React from "react";

const AgroNews = () => (
  <section
    className="py-12 "
    style={{
      backgroundImage: `url('https://7oroofthemes.com/agritec/wp-content/uploads/bg-contact.webp')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    {/* Gradient Overlay */}
    <div className="">
      <div className="max-w-6xl mx-auto p-6 rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-center animate-fadeIn">
          Agro News
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-5 rounded-xl shadow bg-white/80 backdrop-blur transition-all duration-500 hover:shadow-xl hover:-translate-y-2 animate-slideUp">
            <h3 className="font-bold mb-2 text-lg text-green-700">
              New Crop Season Updates
            </h3>
            <p className="text-gray-600">
              Learn about upcoming seasonal crops and planting schedules.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-xl shadow bg-white/80 backdrop-blur transition-all duration-500 hover:shadow-xl hover:-translate-y-2 animate-slideUp">
            <h3 className="font-bold mb-2 text-lg text-green-700">
              Sustainable Farming Tips
            </h3>
            <p className="text-gray-600">
              Reduce waste and increase yield with smart farming techniques.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-xl shadow bg-white/80 backdrop-blur transition-all duration-500 hover:shadow-xl hover:-translate-y-2 animate-slideUp">
            <h3 className="font-bold mb-2 text-lg text-green-700">
              Market Price Trends
            </h3>
            <p className="text-gray-600">
              Check updated crop prices and demand trends in your area.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AgroNews;
