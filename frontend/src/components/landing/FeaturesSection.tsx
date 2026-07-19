import {
  Calendar,
  MessageCircle,
  Star,
  Wallet,
  Search,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Skill Discovery",
    description:
      "Find mentors, learners, and experts based on skills, ratings, and availability.",
  },
  {
    icon: Calendar,
    title: "Easy Session Scheduling",
    description:
      "Book sessions effortlessly with flexible time slots and reminders.",
  },
  {
    icon: Wallet,
    title: "Skill Credit Economy",
    description:
      "Earn credits by teaching and spend them to learn from others.",
  },
  {
    icon: MessageCircle,
    title: "Real-Time Chat",
    description:
      "Connect instantly using messaging, file sharing, and resource links.",
  },
  {
    icon: Star,
    title: "Ratings & Reputation",
    description:
      "Build trust and credibility through reviews and feedback.",
  },
  {
    icon: Users,
    title: "Grow Together",
    description:
      "Become part of a collaborative community of learners and teachers.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-[#f8f6ff]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-violet-600 font-semibold uppercase tracking-wider">
            Why Choose SkillSwap
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-4">
            Everything you need to teach and learn
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            A modern platform designed to make knowledge sharing simple,
            rewarding, and enjoyable.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mb-6">
                  <Icon size={30} className="text-violet-600" />
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;