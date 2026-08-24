import { Star, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";

const ReviewReminderBanner = () => {
  const navigate = useNavigate();
  const { currentUser, sessions, reviews } = useSessions();

  // Find completed sessions where current user is the learner and no review has been submitted yet
  const unreviewedSessions = sessions.filter(
    (s) =>
      s.learnerId === currentUser.id &&
      s.status === "completed" &&
      !reviews.some((r) => r.sessionId === s.id)
  );

  if (unreviewedSessions.length === 0) {
    return null;
  }

  const primarySession = unreviewedSessions[0];

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 p-6 text-white shadow-md transition-all">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Star className="text-white fill-white" size={24} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold backdrop-blur">
                <Sparkles size={12} />
                Review Required
              </span>
              {unreviewedSessions.length > 1 && (
                <span className="rounded-full bg-black/20 px-2 py-0.5 text-[11px] font-bold">
                  {unreviewedSessions.length} sessions pending review
                </span>
              )}
            </div>

            <h2 className="mt-1 text-lg font-bold text-white">
              You have a session waiting for your review
            </h2>

            <p className="mt-0.5 text-sm text-amber-100">
              How was your peer session on <span className="font-semibold text-white">"{primarySession.topic}"</span> with <span className="font-semibold text-white">{primarySession.mentor}</span>? Share feedback to help the community grow.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigate(`/review-session/${primarySession.id}`)}
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-amber-700 shadow-sm transition hover:scale-105 hover:bg-amber-50"
          >
            Leave Review
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewReminderBanner;
