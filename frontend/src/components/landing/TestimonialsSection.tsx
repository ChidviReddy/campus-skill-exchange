import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    review:
      "I taught React and learned System Design from peers. The experience was amazing and helped me grow faster.",
  },
  {
    name: "David Kim",
    role: "Machine Learning Enthusiast",
    review:
      "The platform made it incredibly easy to find mentors and collaborate with other learners.",
  },
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
    review:
      "Teaching design while learning backend development created the perfect skill exchange experience.",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-[#f8f6ff]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-violet-600 font-semibold uppercase tracking-widest">
            Testimonials
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-4">
            Loved by learners and teachers
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Thousands of people are already sharing knowledge and growing together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={20}
                    fill="#FACC15"
                    className="text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                "{testimonial.review}"
              </p>

              <div>
                <h4 className="font-semibold text-lg text-gray-900">
                  {testimonial.name}
                </h4>

                <p className="text-gray-500">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;