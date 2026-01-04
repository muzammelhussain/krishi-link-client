import React from "react";

const ContactAndSupport = () => {
  return (
    <div className="card w-full lg:max-w-md bg-base-100 shadow-xl border border-base-300 p-6">
      {/* Header */}
      <h2 className="card-title text-2xl text-primary mb-4">Get in Touch 📞</h2>
      <p className="mb-6 text-sm">
        We’d love to hear from you! Whether you have a question, feedback, or
        need support, feel free to reach out.
      </p>

      {/* Contact Details */}
      <div className="space-y-3 mb-6">
        <h3 className="font-semibold text-neutral">Contact Details</h3>
        <div className="flex items-center space-x-2">
          <span className="text-accent">✉️</span>
          <p className="text-sm">
            Email:{" "}
            <a href="mailto:support@krishilink.com" className="link link-hover">
              support@krishilink.com
            </a>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-accent">📱</span>
          <p className="text-sm">Phone: +880-XXXXXXXXX</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-accent">📍</span>
          <p className="text-sm">Location: Bangladesh</p>
        </div>
      </div>

      {/* Support Hours */}
      <div>
        <h3 className="font-semibold text-neutral mb-2">Support Hours</h3>
        <div className="flex justify-between text-sm bg-base-200 p-2 rounded">
          <p className="font-medium">Days:</p>
          <p>Sunday – Thursday</p>
        </div>
        <div className="flex justify-between text-sm p-2">
          <p className="font-medium">Timing (GMT +6):</p>
          <p>9:00 AM – 6:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default ContactAndSupport;
