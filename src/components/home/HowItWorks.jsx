import React from "react";

const HowItWorks = () => (
  <section className="bg-gray-100 py-12">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-xl font-semibold mb-2">1. Register</h3>
          <p>Create an account to buy or sell crops easily.</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-xl font-semibold mb-2">2. Browse Crops</h3>
          <p>Explore crops available from farmers near you.</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-xl font-semibold mb-2">3. Buy & Sell</h3>
          <p>Place orders, negotiate prices, and manage your crops.</p>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
