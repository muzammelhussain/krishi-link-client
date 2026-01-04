const jobs = [
  {
    title: "Frontend Developer",
    type: "Remote",
    location: "Bangladesh",
  },
  {
    title: "Backend Developer",
    type: "Full Time",
    location: "Dhaka",
  },
  {
    title: "Agro Consultant",
    type: "Contract",
    location: "Field Based",
  },
];

const Careers = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-4">Careers</h2>
      <p className="text-center text-gray-600 mb-12">
        Join our mission to digitize agriculture and empower farmers.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className=" rounded-sm p-6 bg-base-300 shadow hover:shadow-md transition"
          >
            <h3 className="text-xl text-green-400 font-semibold mb-2">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.type}</p>
            <p className="text-sm text-gray-600 mb-4">{job.location}</p>

            <button className="btn btn-success btn-sm">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Careers;
