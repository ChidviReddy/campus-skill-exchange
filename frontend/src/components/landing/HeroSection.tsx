import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
            Teach what you know,
            <br />
            <span className="text-violet-600">
              Learn
            </span>{" "}
            what you don't.
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
            SkillSwap connects students to exchange skills,
            grow together and build a stronger campus community.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="px-8 py-4 bg-violet-600 text-white rounded-2xl font-semibold hover:bg-violet-700 transition">
              Get Started
            </button>

            <button className="px-8 py-4 border border-gray-300 rounded-2xl font-semibold hover:bg-gray-100 transition">
              Explore Skills
            </button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full bg-violet-300 border-4 border-white"></div>
              <div className="w-12 h-12 rounded-full bg-pink-300 border-4 border-white"></div>
              <div className="w-12 h-12 rounded-full bg-blue-300 border-4 border-white"></div>
              <div className="w-12 h-12 rounded-full bg-green-300 border-4 border-white"></div>
            </div>

            <p className="text-gray-600">
              Join <span className="font-bold">5,000+</span> students already learning and teaching
            </p>
          </div>
        </motion.div>

        {/* Right Side Illustration Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex justify-center"
        >
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-200 to-purple-100 blur-3xl opacity-80"></div>
        </motion.div>

      </div>
    </section>
  );
}

export default HeroSection;