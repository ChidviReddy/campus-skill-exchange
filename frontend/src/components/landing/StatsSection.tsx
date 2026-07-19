const stats = [
  {
    value: "10K+",
    label: "Active Learners",
  },
  {
    value: "500+",
    label: "Skills Available",
  },
  {
    value: "50K+",
    label: "Sessions Completed",
  },
  {
    value: "4.9★",
    label: "Average Rating",
  },
];

function StatsSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl p-12 shadow-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  {stat.value}
                </h2>

                <p className="text-violet-100 mt-3 text-lg">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;