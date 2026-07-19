import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-[40px] p-12 lg:p-20 text-center shadow-2xl">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to start your learning journey?
          </h2>

          <p className="text-violet-100 text-lg max-w-2xl mx-auto mb-10">
            Join thousands of learners and educators exchanging knowledge,
            growing together, and building meaningful connections.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link
              to="/signup"
              className="px-8 py-4 bg-white text-violet-700 font-semibold rounded-2xl hover:scale-105 transition duration-300"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 border border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-violet-700 transition duration-300"
            >
              Explore Skills
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;