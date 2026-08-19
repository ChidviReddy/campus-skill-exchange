import { useState } from "react";
import type { FormEvent } from "react";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import type { Session } from "@/data/sessions";
import type { SessionReview } from "@/context/SessionContext";
import RatingSelector from "./RatingSelector";

type ReviewFormProps = {
  session: Session;
  onSuccess: (review: SessionReview) => void;
};

const ReviewForm = ({ session, onSuccess }: ReviewFormProps) => {
  const navigate = useNavigate();
  const { submitReview } = useSessions();

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation: Rating is required
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    const reviewPayload = {
      sessionId: session.id,
      mentor: session.mentor,
      topic: session.topic,
      rating,
      reviewText: reviewText.trim(),
    };

    const success = submitReview(reviewPayload);
    if (success) {
      onSuccess({
        ...reviewPayload,
        submittedAt: new Date().toISOString(),
      });
    } else {
      setError("You have already submitted a review for this session.");
    }
  };

  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      <h2 className="text-lg font-semibold text-[#211653]">
        Rate & Review
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Error notification */}
        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={18} className="shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Rating Selector */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5">
          <RatingSelector
            rating={rating}
            onChange={(selectedRating) => {
              setRating(selectedRating);
              if (error) setError(null);
            }}
          />
        </div>

        {/* Textarea for review text */}
        <div>
          <label
            htmlFor="review-experience"
            className="block text-sm font-semibold text-slate-700"
          >
            Share your experience
          </label>
          <textarea
            id="review-experience"
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Tell others what you learned and how the session went..."
            className="mt-2 w-full rounded-xl border border-violet-100 bg-slate-50/50 p-4 text-sm text-slate-800 shadow-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
          />
          <p className="mt-1.5 text-xs text-slate-400">
            Optional. Your feedback helps other learners on SkillSwap.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/my-sessions")}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-violet-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md"
          >
            Submit Review
          </button>
        </div>
      </form>
    </section>
  );
};

export default ReviewForm;
