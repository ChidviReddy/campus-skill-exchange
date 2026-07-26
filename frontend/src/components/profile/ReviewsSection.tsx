import { Star, MessageSquare } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahul Verma",
    rating: 5,
    date: "2 weeks ago",
    session: "React Basics",
    review:
      "Priya explained every concept clearly with practical examples. The session was interactive and really helped me understand React fundamentals.",
  },
  {
    id: 2,
    name: "Ananya Rao",
    rating: 5,
    date: "1 month ago",
    session: "TypeScript",
    review:
      "Excellent mentor! She answered every doubt patiently and provided useful resources after the session.",
  },
  {
    id: 3,
    name: "Karthik Kumar",
    rating: 4,
    date: "2 months ago",
    session: "Next.js",
    review:
      "Very knowledgeable and friendly. The projects discussed during the session were extremely helpful.",
  },
];

const ReviewsSection = () => {
  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
          <MessageSquare
            size={22}
            className="text-violet-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Student Reviews
          </h2>

          <p className="text-sm text-slate-500">
            Feedback from previous learning sessions.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-2xl border border-slate-200 p-5 transition hover:border-violet-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  {review.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {review.session} • {review.date}
                </p>
              </div>

              <div className="flex">
                {[...Array(review.rating)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>

            <p className="mt-4 leading-7 text-slate-600">
              {review.review}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;