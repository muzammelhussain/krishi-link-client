import React from "react";

const FeaturedServices = () => (
  <section className="max-w-6xl mx-auto p-6">
    <h2 className="text-3xl font-bold mb-6 text-center">Our Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      <div className="p-6 bg-white rounded shadow">
        <h3 className="font-bold mb-2">Crop Marketplace</h3>
        <p>Buy and sell crops online safely and easily.</p>
      </div>
      <div className="p-6 bg-white rounded shadow">
        <h3 className="font-bold mb-2">Farm Management</h3>
        <p>Manage your crops, inventory, and sales efficiently.</p>
      </div>
      <div className="p-6 bg-white rounded shadow">
        <h3 className="font-bold mb-2">Agro Education</h3>
        <p>Learn best practices and latest farming techniques.</p>
      </div>
    </div>
  </section>
);

export default FeaturedServices;
