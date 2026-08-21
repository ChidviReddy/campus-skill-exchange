import { useState } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import type { Session } from "@/data/sessions";
import type { SessionReview } from "@/context/SessionContext";

import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

import ReviewHeader from "./ReviewHeader";
import ReviewSessionSummary from "./ReviewSessionSummary";
import ReviewForm from "./ReviewForm";
import ReviewSuccess from "./ReviewSuccess";
import AlreadyReviewed from "./AlreadyReviewed";

type ReviewSessionLayoutProps = {
  session: Session | undefined;
};

const ReviewSessionLayout = ({ session }: ReviewSessionLayoutProps) => {
  const navigate = useNavigate();
  const { currentUser, getReviewBySessionId } = useSessions();
  const [submittedReview, setSubmittedReview] = useState<SessionReview | null>(
    null
  );

  // 1. Invalid Session ID check
  if (!session) {
    return (
      <div className="flex min-h-screen bg-[#f8f7fc]">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">
            <Topbar />

            <div className="mx-auto mt-16 max-w-lg text-center">
              <div className="rounded-3xl border border-violet-100 bg-white p-10 shadow-sm">
                <h2 className="text-2xl font-bold text-[#211653]">
                  Session not found
                </h2>
                <p className="mt-3 text-slate-500">
                  The session you are looking for does not exist or may have been removed.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => navigate("/my-sessions")}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
                  >
                    <ArrowLeft size={18} />
                    Back to My Sessions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 2. Non-completed session check
  if (session.status !== "completed") {
    return (
      <div className="flex min-h-screen bg-[#f8f7fc]">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">
            <Topbar />

            <div className="mx-auto mt-16 max-w-lg text-center">
              <div className="rounded-3xl border border-amber-100 bg-white p-10 shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <Clock size={32} />
                </div>

                <h2 className="mt-4 text-2xl font-bold text-[#211653]">
                  Reviews are available after a session is completed.
                </h2>

                <p className="mt-3 text-slate-500">
                  This session on <span className="font-semibold text-slate-700">{session.topic}</span> is currently marked as{" "}
                  <span className="font-semibold capitalize text-slate-700">{session.status}</span>.
                </p>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => navigate("/my-sessions")}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
                  >
                    <ArrowLeft size={18} />
                    Back to My Sessions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 3. Learner Role check: ONLY the learner can review the mentor
  if (currentUser.id !== session.learnerId) {
    return (
      <div className="flex min-h-screen bg-[#f8f7fc]">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">
            <Topbar />

            <div className="mx-auto mt-16 max-w-lg text-center">
              <div className="rounded-3xl border border-violet-100 bg-white p-10 shadow-sm">
                <h2 className="text-2xl font-bold text-[#211653]">
                  Only the learner can submit a review.
                </h2>

                <p className="mt-3 text-slate-500">
                  Reviews are intended for learners to share feedback about their mentor. You are not the learner for this session.
                </p>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => navigate("/my-sessions")}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
                  >
                    <ArrowLeft size={18} />
                    Back to My Sessions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 4. Check if session has already been reviewed in state
  const existingReview = getReviewBySessionId(session.id);

  return (
    <div className="flex min-h-screen bg-[#f8f7fc]">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <Topbar />

          <div className="mx-auto mt-8 max-w-4xl space-y-7">
            {submittedReview ? (
              <ReviewSuccess review={submittedReview} />
            ) : existingReview ? (
              <AlreadyReviewed review={existingReview} />
            ) : (
              <>
                <ReviewHeader session={session} />
                <ReviewSessionSummary session={session} />
                <ReviewForm
                  session={session}
                  onSuccess={(review) => setSubmittedReview(review)}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewSessionLayout;
