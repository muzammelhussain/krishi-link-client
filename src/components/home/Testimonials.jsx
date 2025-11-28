import React from "react";

const Testimonials = () => (
  <section className="bg-green-50 py-12">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <p>"Hero App Hub helped me sell my crops faster than ever!"</p>
          <p className="mt-2 font-semibold">— Farmer A</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <p>"Finding fresh vegetables from local farmers is so easy now."</p>
          <p className="mt-2 font-semibold">— Customer B</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <p>"Great platform for connecting farmers and buyers."</p>
          <p className="mt-2 font-semibold">— Farmer C</p>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials;
