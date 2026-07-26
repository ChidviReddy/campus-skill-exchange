import { motion } from "framer-motion";
import { ArrowRight, Search, UserPlus, Users } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Sign up, showcase your skills, and tell others what you want to learn.",
  },
  {
    icon: Search,
    title: "Find Skill Partners",
    description:
      "Browse students based on skills, interests, ratings, and availability.",
  },
  {
    icon: Users,
    title: "Learn & Teach",
    description:
      "Connect, schedule sessions, exchange knowledge, and grow together.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-[#faf9ff] py-14"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Simple Process
          </span>

          <h2 className="mt-6 text-5xl font-bold text-gray-900">
            How SkillSwap Works
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Start learning in just three simple steps.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                }}
                whileHover={{
                  y: -8,
                }}
                className="relative rounded-3xl border border-gray-200 bg-white p-10 shadow-sm transition-all hover:shadow-2xl"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
                  <Icon className="h-8 w-8 text-violet-600" />
                </div>

                <div className="absolute right-8 top-8 text-6xl font-bold text-gray-100">
                  0{index + 1}
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-5 leading-8 text-gray-600">
                  {step.description}
                </p>

                {index !== steps.length - 1 && (
                  <ArrowRight className="absolute -right-5 top-1/2 hidden h-10 w-10 rounded-full bg-violet-600 p-2 text-white lg:block" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}