import React from "react";

const AgroNews = () => (
  <section className="max-w-6xl mx-auto p-6">
    <h2 className="text-3xl font-bold mb-6">Agro News</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-4 border rounded shadow">
        <h3 className="font-bold mb-2">New Crop Season Updates</h3>
        <p>Learn about seasonal crops and planting schedules.</p>
      </div>
      <div className="p-4 border rounded shadow">
        <h3 className="font-bold mb-2">Sustainable Farming Tips</h3>
        <p>Reduce waste and increase crop yield with modern techniques.</p>
      </div>
      <div className="p-4 border rounded shadow">
        <h3 className="font-bold mb-2">Market Price Trends</h3>
        <p>Check current crop prices and demand trends in your region.</p>
      </div>
    </div>
  </section>
);

export default AgroNews;
