import { useState } from "react";
import {
  Video,
  CalendarClock,
  X,
  FileText,
  Check,
  ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import type { Session } from "@/data/sessions";
import { useSessions } from "@/hooks/useSessions";
import { isSessionBeforeStart, formatStartTimeOnly } from "@/utils/sessionTime";
import CancelSessionModal from "../sessions/CancelSessionModal";
import CancelRequestModal from "../sessions/CancelRequestModal";
import AcceptRequestModal from "../mentor-requests/AcceptRequestModal";
import RejectRequestModal from "../mentor-requests/RejectRequestModal";

type SessionActionsProps = {
  session: Session;
};

const SessionActions = ({ session }: SessionActionsProps) => {
  const navigate = useNavigate();
  const { currentUser, reviews, acceptRequest, rejectRequest } = useSessions();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelRequestModalOpen, setIsCancelRequestModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const isMentorForThisSession = currentUser.id === session.mentorId;
  const isLearnerForThisSession = currentUser.id === session.learnerId;
  const hasReview = reviews.some((r) => r.sessionId === session.id);
  const isBeforeStart = isSessionBeforeStart(session.date, session.time);
  const startTimeDisplay = formatStartTimeOnly(session.time);

  if (session.status === "rejected") {
    return (
      <section className="rounded-2xl border border-red-100 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                Declined
              </span>
              <h2 className="text-lg font-semibold text-[#211653]">
                This session request was declined
              </h2>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              The mentor was unable to accept this request. Zero credits were deducted. You can request another session or explore other mentors.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/explore")}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
            >
              Explore Mentors
            </button>
            <button
              type="button"
              onClick={() => navigate("/my-sessions")}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Back to My Sessions
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (session.status === "cancelled") {
    return (
      <section className="rounded-2xl border border-red-100 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                Cancelled
              </span>
              <h2 className="text-lg font-semibold text-[#211653]">
                This session has been cancelled
              </h2>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              This session is no longer active. You can browse other mentors or explore new skills.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate(`/book-again/${session.id}`)}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
            >
              Book Again
            </button>
            <button
              type="button"
              onClick={() => navigate("/my-sessions")}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Back to My Sessions
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (session.status === "pending") {
    if (isMentorForThisSession) {
      return (
        <>
          <section className="rounded-2xl border border-amber-100 bg-white p-7 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                    Pending Mentor Review
                  </span>
                  <h2 className="text-lg font-semibold text-[#211653]">
                    Incoming Session Request
                  </h2>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  {session.learnerName || "Learner (Chidvi)"} requested to learn{" "}
                  <span className="font-semibold text-slate-700">{session.topic}</span> with you.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIsRejectModalOpen(true)}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <X size={18} />
                  Decline Request
                </button>
                <button
                  type="button"
                  onClick={() => setIsAcceptModalOpen(true)}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 shadow-xs"
                >
                  <Check size={18} />
                  Accept Request
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/mentor-requests")}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
                >
                  <ArrowLeft size={16} />
                  Back to Requests
                </button>
              </div>
            </div>
          </section>

          <AcceptRequestModal
            isOpen={isAcceptModalOpen}
            session={session}
            onClose={() => setIsAcceptModalOpen(false)}
            onConfirm={() => {
              acceptRequest(session.id);
              setIsAcceptModalOpen(false);
              navigate("/mentor-requests");
            }}
          />

          <RejectRequestModal
            isOpen={isRejectModalOpen}
            session={session}
            onClose={() => setIsRejectModalOpen(false)}
            onConfirm={() => {
              rejectRequest(session.id);
              setIsRejectModalOpen(false);
              navigate("/mentor-requests");
            }}
          />
        </>
      );
    }

    return (
      <>
        <section className="rounded-2xl border border-amber-100 bg-white p-7 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  Pending Request
                </span>
                <h2 className="text-lg font-semibold text-[#211653]">
                  Waiting for Mentor Acceptance
                </h2>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Your session request has been sent to <span className="font-semibold text-slate-700">{session.mentor}</span>. You will be notified once they respond.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsCancelRequestModalOpen(true)}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <X size={18} />
                Cancel Request
              </button>
              <button
                type="button"
                onClick={() => navigate("/my-sessions")}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
              >
                Back to My Sessions
              </button>
            </div>
          </div>
        </section>

        <CancelRequestModal
          session={session}
          isOpen={isCancelRequestModalOpen}
          onClose={() => setIsCancelRequestModalOpen(false)}
        />
      </>
    );
  }

  if (session.status === "completed") {
    return (
      <section className="rounded-2xl border border-blue-100 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#211653]">
              {isLearnerForThisSession ? "Session Completed" : "Session Completed Successfully"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isLearnerForThisSession
                ? `Review session notes or leave feedback for ${session.mentor}.`
                : `You successfully taught ${session.learnerName || "your student"}. Your teaching reward of +10 credits has been credited to your wallet.`}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate(`/session-notes/${session.id}`)}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-md"
            >
              <FileText size={18} />
              View Notes
            </button>

            {/* ONLY THE LEARNER CAN LEAVE A REVIEW */}
            {isLearnerForThisSession && (
              hasReview ? (
                <button
                  type="button"
                  onClick={() => navigate(`/review-session/${session.id}`)}
                  className="cursor-pointer inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                >
                  Review Submitted
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(`/review-session/${session.id}`)}
                  className="cursor-pointer inline-flex items-center justify-center rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
                >
                  Leave Review
                </button>
              )
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#211653]">
              Ready for your session?
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isBeforeStart
                ? `Session opens on ${session.date} at ${startTimeDisplay}.`
                : "Session is ready. Enter the room now."}
            </p>
          </div>

          {isBeforeStart ? (
            <button
              type="button"
              onClick={() => navigate(`/session-room/${session.id}`)}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-100 px-6 py-3 font-semibold text-violet-700 transition hover:bg-violet-200"
              title={`Session starts at ${startTimeDisplay}`}
            >
              <Video size={19} />
              Starts at {startTimeDisplay}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate(`/session-room/${session.id}`)}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3 font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
            >
              <Video size={19} />
              Join Session
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(`/reschedule-session/${session.id}`)}
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            <CalendarClock size={18} />
            Reschedule
          </button>

          <button
            type="button"
            onClick={() => setIsCancelModalOpen(true)}
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <X size={18} />
            Cancel Session
          </button>
        </div>
      </section>

      <CancelSessionModal
        session={session}
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
      />
    </>
  );
};

export default SessionActions;