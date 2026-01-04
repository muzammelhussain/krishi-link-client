const projects = [
  {
    name: "Digital Crop Marketplace",
    description:
      "An online platform connecting farmers directly with buyers.",
  },
  {
    name: "Smart Farm Dashboard",
    description:
      "Tools for farmers to manage crops, track sales, and monitor demand.",
  },
  {
    name: "Agro Education Portal",
    description:
      "Educational resources and best practices for modern farming.",
  },
];

const Projects = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Projects</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-base-300 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-3 text-green-400">{project.name}</h3>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
