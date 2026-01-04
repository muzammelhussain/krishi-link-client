import React from "react";
import CountUp from "react-countup";
import {
  FaSeedling,
  FaUsers,
  FaHandshake,
  FaCheckCircle,
} from "react-icons/fa";

const stats = [
  {
    label: "Crop Listings",
    value: 1000,
    suffix: "+",
    icon: <FaSeedling />,
  },
  {
    label: "Active Farmers",
    value: 500,
    suffix: "+",
    icon: <FaUsers />,
  },
  {
    label: "Buyer Requests",
    value: 2000,
    suffix: "+",
    icon: <FaHandshake />,
  },
  {
    label: "Data Accuracy",
    value: 99.9,
    suffix: "%",
    decimals: 1,
    icon: <FaCheckCircle />,
  },
];

const StatisticsSection = () => {
  return (
    <section className="my-28 bg-primary/5 py-16 rounded-2xl">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
        <p className="text-gray-500">
          Trusted by farmers and buyers across the platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-base-100 border border-gray-200 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition"
          >
            <div className="text-primary text-4xl mb-4 flex justify-center">
              {stat.icon}
            </div>

            <h3 className="text-3xl font-bold">
              <CountUp
                end={stat.value}
                duration={10.5}
                decimals={stat.decimals || 0}
              />
              {stat.suffix}
            </h3>

            <p className="text-gray-500 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;
