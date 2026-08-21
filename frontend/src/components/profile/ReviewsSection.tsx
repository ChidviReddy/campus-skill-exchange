import { Star, MessageSquare } from "lucide-react";
import type { User } from "@/data/mentors";
import { useSessions } from "@/hooks/useSessions";

type ReviewsSectionProps = {
  user: User;
};

const ReviewsSection = ({ user }: ReviewsSectionProps) => {
  const { getUserReviews, getUserById } = useSessions();
  const userReviews = getUserReviews(user.id);

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
            Feedback received from previous learning sessions.
          </p>
        </div>
      </div>

      {userReviews.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-violet-200 bg-violet-50/50 p-8 text-center">
          <MessageSquare size={32} className="mx-auto text-violet-400" />
          <h3 className="mt-3 text-base font-semibold text-slate-800">
            No reviews yet
          </h3>
          <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
            Reviews will appear here after students complete mentorship sessions with {user.name}.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {userReviews.map((review) => {
            const reviewer = getUserById(review.reviewerId);
            const reviewerName = reviewer?.name || "Campus Learner";

            return (
              <div
                key={review.sessionId}
                className="rounded-2xl border border-slate-200 p-5 transition hover:border-violet-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {reviewerName}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {review.topic} • {review.submittedAt}
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
                  {review.reviewText || review.comment}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;