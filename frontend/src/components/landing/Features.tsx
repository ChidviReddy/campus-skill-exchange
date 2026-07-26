import { motion } from "framer-motion";
import {
  Brain,
  Users,
  MessageSquare,
  Award,
  Search,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Learn New Skills",
    description:
      "Discover students who can teach technologies, languages, design, music, business and much more.",
  },
  {
    icon: Users,
    title: "Peer-to-Peer Learning",
    description:
      "Connect with like-minded learners and mentors inside your campus community.",
  },
  {
    icon: MessageSquare,
    title: "Real-time Chat",
    description:
      "Discuss, schedule sessions and collaborate through instant messaging.",
  },
  {
    icon: Search,
    title: "Smart Skill Matching",
    description:
      "Find the best learning partners using intelligent recommendations.",
  },
  {
    icon: Award,
    title: "Build Your Portfolio",
    description:
      "Earn ratings, reviews and showcase your teaching experience.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Community",
    description:
      "Only verified students can join, creating a safe learning environment.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Why SkillSwap?
          </span>

          <h2 className="mt-6 text-5xl font-bold text-gray-900">
            Everything you need to
            <span className="text-violet-600"> learn faster</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            SkillSwap helps students exchange knowledge effortlessly while
            building meaningful connections and practical experience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-violet-200 hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 transition-all group-hover:bg-violet-600">
                  <Icon className="h-8 w-8 text-violet-600 transition-all group-hover:text-white" />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
