import { CheckCircle2, Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { SessionReview } from "@/context/SessionContext";

type ReviewSuccessProps = {
  review: SessionReview;
};

const ReviewSuccess = ({ review }: ReviewSuccessProps) => {
  const navigate = useNavigate();

  return (
    <section className="rounded-2xl border border-green-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
          <CheckCircle2 size={32} />
        </div>

        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          Review submitted successfully!
        </h2>

        <p className="mt-2 text-slate-500">
          Thank you for sharing your experience.
        </p>

        {/* Review Summary Card */}
        <div className="mt-6 w-full max-w-md rounded-2xl border border-slate-100 bg-slate-50/70 p-5 text-left">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
            <div>
              <p className="text-xs font-medium text-slate-400">Mentor</p>
              <p className="font-semibold text-slate-800">{review.mentor}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-slate-400">Topic</p>
              <p className="font-semibold text-slate-800">{review.topic}</p>
            </div>
          </div>

          {/* Rating stars */}
          <div className="mt-4 flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                className={
                  star <= review.rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300"
                }
              />
            ))}
            <span className="ml-2 text-sm font-semibold text-slate-700">
              {review.rating} / 5
            </span>
          </div>

          {/* Review Text */}
          {review.reviewText && (
            <p className="mt-3 text-sm leading-relaxed text-slate-600 italic">
              "{review.reviewText}"
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => navigate("/my-sessions")}
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
          >
            <ArrowLeft size={18} />
            Back to My Sessions
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewSuccess;
