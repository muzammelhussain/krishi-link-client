import React from "react";
import { Link } from "react-router";

const FinalCTA = () => {
  return (
    <section className="my-32 px-4">
      <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 text-white p-12 md:p-20 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Start Trading Crops <br className="hidden md:block" />
            Smarter Today
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-white/90 mb-10">
            Join KrishiLink and connect directly with farmers and buyers.
            Transparent pricing, secure trading, and smarter agriculture — all
            in one platform.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 rounded-full bg-white text-green-600 font-semibold hover:bg-gray-100 transition"
            >
              Create Account
            </Link>

            <Link
              to="/all-crops"
              className="px-8 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-green-600 transition"
            >
              Explore Marketplace
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
