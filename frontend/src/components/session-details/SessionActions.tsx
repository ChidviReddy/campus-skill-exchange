import { useState } from "react";
import {
  Video,
  CalendarClock,
  X,
  FileText,
  Check,
  ArrowLeft,
  Star,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import type { Session } from "@/data/sessions";
import { useSessions } from "@/hooks/useSessions";
import {
  isSessionBeforeStart,
  formatStartTimeOnly,
  isSessionExpired,
  isInitialRequestExpired,
} from "@/utils/sessionTime";
import CancelSessionModal from "../sessions/CancelSessionModal";
import CancelRequestModal from "../sessions/CancelRequestModal";
import AcceptRequestModal from "../mentor-requests/AcceptRequestModal";
import RejectRequestModal from "../mentor-requests/RejectRequestModal";

type SessionActionsProps = {
  session: Session;
};

const SessionActions = ({ session }: SessionActionsProps) => {
  const navigate = useNavigate();
  const {
    currentUser,
    reviews,
    acceptRequest,
    rejectRequest,
    getPendingRescheduleForSession,
    acceptRescheduleRequest,
    rejectRescheduleRequest,
  } = useSessions();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelRequestModalOpen, setIsCancelRequestModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const isMentorForThisSession = currentUser.id === session.mentorId;
  const isLearnerForThisSession = currentUser.id === session.learnerId;
  const hasReview = reviews.some((r) => r.sessionId === session.id);
  const isBeforeStart = isSessionBeforeStart(session.date, session.time);
  const startTimeDisplay = formatStartTimeOnly(session.time);
  const isExpired = isSessionExpired(session);
  const isInitialExpired = isInitialRequestExpired(session);

  const pendingReschedule = getPendingRescheduleForSession(session.id);
  const otherPartyName = isMentorForThisSession
    ? session.learnerName || "Learner"
    : session.mentor;

  // 1. REJECTED
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

  // 2. CANCELLED
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
              This session is no longer active. You can browse other mentors or schedule a new session from the mentor profile.
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

  // 3. EXPIRED (either unstarted upcoming session or unaccepted initial request)
  if ((isExpired && session.status === "upcoming") || (isInitialExpired && session.status === "pending")) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                <AlertCircle size={13} />
                Expired
              </span>
              <h2 className="text-lg font-semibold text-[#211653]">
                This session request has expired
              </h2>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              This session was requested for {session.date} at {session.time} but was not confirmed before the scheduled start time. Zero credits were deducted.
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

  // 4. PENDING (unexpired)
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
                  {session.learnerName || "Student Learner"} requested to learn{" "}
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

  // 5. COMPLETED
  if (session.status === "completed") {
    return (
      <section className="rounded-2xl border border-blue-100 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                Completed
              </span>
              {isLearnerForThisSession && !hasReview && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-300">
                  <Star size={13} className="fill-amber-500 text-amber-500" />
                  Review Required
                </span>
              )}
            </div>

            <h2 className="mt-2 text-lg font-semibold text-[#211653]">
              {isLearnerForThisSession ? "Session Completed" : "Teaching Session Completed"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isLearnerForThisSession
                ? hasReview
                  ? `You completed this session with ${session.mentor}. Thank you for your feedback!`
                  : `Please review your mentor to complete this session feedback.`
                : `You successfully taught ${session.learnerName || "your student"}. Your teaching reward of +10 credits has been added to your wallet.`}
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

            {/* MANDATORY REVIEW FOR LEARNER ONLY */}
            {isLearnerForThisSession && (
              hasReview ? (
                <button
                  type="button"
                  onClick={() => navigate(`/review-session/${session.id}`)}
                  className="cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                >
                  <CheckCircle2 size={16} />
                  Review Submitted
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(`/review-session/${session.id}`)}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-violet-700 hover:scale-105"
                >
                  <Star size={16} className="fill-amber-300 text-amber-300" />
                  Leave Review
                </button>
              )
            )}
          </div>
        </div>
      </section>
    );
  }

  // 6. UPCOMING / IN PROGRESS
  return (
    <>
      <section className="space-y-6">
        {/* PENDING RESCHEDULE PROPOSAL CARD */}
        {pendingReschedule && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                  <CalendarClock size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-amber-950 text-base">
                    {currentUser.id === pendingReschedule.requestedForId
                      ? `${otherPartyName} Proposed to Reschedule This Session`
                      : "You Proposed a Reschedule for This Session"}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-amber-900">
                    Proposed New Schedule: {pendingReschedule.proposedDate} at {pendingReschedule.proposedTime}
                  </p>
                  {pendingReschedule.reason && (
                    <p className="mt-1 text-xs text-amber-800 italic">
                      Note: "{pendingReschedule.reason}"
                    </p>
                  )}
                </div>
              </div>

              {currentUser.id === pendingReschedule.requestedForId ? (
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => rejectRescheduleRequest(pendingReschedule.id)}
                    className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <X size={15} />
                    Decline Reschedule
                  </button>
                  <button
                    type="button"
                    onClick={() => acceptRescheduleRequest(pendingReschedule.id)}
                    className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700"
                  >
                    <Check size={15} />
                    Accept Reschedule
                  </button>
                </div>
              ) : (
                <span className="rounded-full bg-amber-100 px-3.5 py-1 text-xs font-semibold text-amber-800">
                  Waiting for response
                </span>
              )}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#211653]">
                {session.isStarted
                  ? "Session In Progress"
                  : "Ready for your session?"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {session.isStarted
                  ? "The live mentorship stream is open. Click below to enter the room."
                  : isBeforeStart
                  ? `Session opens on ${session.date} at ${startTimeDisplay}.`
                  : "Session is ready. Enter the room now."}
              </p>
            </div>

            {session.isStarted ? (
              <button
                type="button"
                onClick={() => navigate(`/session-room/${session.id}`)}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-emerald-700 hover:scale-105"
              >
                <Video size={19} className="animate-pulse" />
                Enter Live Session
              </button>
            ) : isBeforeStart ? (
              <button
                type="button"
                onClick={() => navigate(`/session-room/${session.id}`)}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-100 px-6 py-3 font-semibold text-violet-700 transition hover:bg-violet-200"
                title={`Session starts at ${startTimeDisplay}`}
              >
                <Video size={19} />
                Starts at {startTimeDisplay}
              </button>
            ) : isMentorForThisSession ? (
              <button
                type="button"
                onClick={() => navigate(`/session-room/${session.id}`)}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3 font-semibold text-white transition hover:bg-emerald-700 hover:shadow-md"
              >
                <Video size={19} />
                Start Session
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