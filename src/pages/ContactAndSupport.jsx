import React from "react";

const ContactAndSupport = () => {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-lg border border-base-100 p-6 md:p-8">
        
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-green-500 mb-2">
          Get in Touch 📞
        </h2>
        <p className="text-sm md:text-base text-base-content/70 mb-6">
          We’d love to hear from you! Whether you have a question, feedback, or
          need support, feel free to reach out.
        </p>

        <div className="divider"></div>

        {/* Contact Details */}
        <div className="space-y-4 mb-6">
          <h3 className="font-semibold text-lg text-green-300">
            Contact Details
          </h3>

          <div className="flex items-start gap-3">
            <span className="text-xl">✉️</span>
            <p className="text-sm md:text-base">
              Email:
              <a
                href="mailto:support@krishilink.com"
                className="ml-1 link link-primary break-all"
              >
                support@krishilink.com
              </a>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">📱</span>
            <p className="text-sm md:text-base">
              Phone: <span className="font-medium">+880-1580898928</span>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">📍</span>
            <p className="text-sm md:text-base">
              Location: <span className="font-medium">Bangladesh</span>
            </p>
          </div>
        </div>

        <div className="divider"></div>

        {/* Support Hours */}
        <div>
          <h3 className="font-semibold text-lg text-green-300 mb-3">
            Support Hours
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm md:text-base bg-base-200 p-3 rounded-lg">
              <span className="font-medium">Days</span>
              <span>Sunday – Thursday</span>
            </div>

            <div className="flex justify-between items-center text-sm md:text-base bg-base-200 p-3 rounded-lg">
              <span className="font-medium">Time (GMT +6)</span>
              <span>9:00 AM – 6:00 PM</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactAndSupport;
