import React from "react";

const ValueProposition = () => {
  // Array of key features derived directly from the "Why KrishiLink?" section
  const features = [
    {
      title: "Secure & Accessible",
      description:
        "Secure authentication and role-based access to protect your data.",
      icon: "🔒", // Lock icon for security
    },
    {
      title: "Real-Time Market Data",
      description:
        "Real-time interest management allows for quick and responsive trading.",
      icon: "⚡", // Lightning icon for real-time speed
    },
    {
      title: "Reliable Tracking",
      description:
        "Automatic quantity tracking ensures inventory and transaction accuracy.",
      icon: "✅", // Checkmark icon for accuracy
    },
    {
      title: "Mobile-First Design",
      description: "A mobile-friendly and accessible UI for trading on the go.",
      icon: "📱", // Phone icon for mobile access
    },
  ];

  return (
    <section className="py-16 bg-base-100 text-base-content max-w-7xl mx-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Component Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-500 sm:text-4xl">
            Why Choose KrishiLink?
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Our platform is built to reduce middlemen, empower farmers, and
            create a fair trading environment.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-xl p-6 transition-transform transform hover:scale-[1.03]"
            >
              <div className="text-4xl mb-4 text-accent">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-base-content mb-2">
                {feature.title}
              </h3>
              <p className="text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Mission Statement Callout */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-green-300">Our Mission:</h3>
          <p className="mt-2 text-xl font-medium text-primary-focus">
            To simplify crop trading through technology and ensure fair pricing
            and transparency.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
