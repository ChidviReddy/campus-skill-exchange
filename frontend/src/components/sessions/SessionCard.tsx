import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  Coins,
  User,
  Radio,
  FileText,
  X,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Session } from "@/data/sessions";
import { useSessions } from "@/hooks/useSessions";
import { isSessionBeforeStart, formatStartTimeOnly } from "@/utils/sessionTime";
import CancelSessionModal from "./CancelSessionModal";
import CancelRequestModal from "./CancelRequestModal";

type SessionCardProps = Session;

const statusStyles: Record<
  "upcoming" | "pending" | "completed" | "cancelled" | "rejected",
  { badge: string; text: string }
> = {
  upcoming: {
    badge: "bg-green-100 text-green-700",
    text: "Upcoming",
  },
  pending: {
    badge: "bg-amber-100 text-amber-700",
    text: "Pending",
  },
  completed: {
    badge: "bg-blue-100 text-blue-700",
    text: "Completed",
  },
  cancelled: {
    badge: "bg-red-100 text-red-700",
    text: "Cancelled",
  },
  rejected: {
    badge: "bg-red-100 text-red-700",
    text: "Declined",
  },
};

const SessionCard = (session: SessionCardProps) => {
  const {
    id,
    mentor,
    topic,
    date,
    time,
    duration,
    status,
    learnerId,
    isStarted,
  } = session;
  const navigate = useNavigate();
  const { currentUser, reviews } = useSessions();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelRequestModalOpen, setIsCancelRequestModalOpen] = useState(false);

  const isLearner = currentUser.id === learnerId;
  const isMentor = currentUser.id === session.mentorId;
  const hasReview = reviews.some((r) => r.sessionId === id);
  const isBeforeStart = isSessionBeforeStart(date, time);
  const startTimeDisplay = formatStartTimeOnly(time);

  const currentStatus = statusStyles[status];

  // Dynamic role-specific subtitle
  let roleSubtitle = "";
  if (status === "completed") {
    roleSubtitle = isLearner
      ? `You learned ${topic} from ${mentor}.`
      : `You taught ${topic} to ${session.learnerName || "your student"}.`;
  } else if (isStarted) {
    roleSubtitle = isLearner
      ? `Live session in progress with ${mentor}.`
      : `Live session in progress with ${session.learnerName || "your student"}.`;
  } else if (status === "upcoming") {
    roleSubtitle = isLearner
      ? `You are learning from ${mentor}.`
      : `You are teaching ${session.learnerName || "your student"}.`;
  } else if (status === "pending") {
    roleSubtitle = isLearner
      ? `Waiting for ${mentor} to accept your request.`
      : `Incoming request from ${session.learnerName || "Student"}.`;
  } else if (status === "cancelled") {
    roleSubtitle = isLearner
      ? `Cancelled session with ${mentor}.`
      : `Cancelled session with ${session.learnerName || "Student"}.`;
  } else {
    roleSubtitle = isLearner
      ? `Declined by ${mentor}.`
      : `Declined request from ${session.learnerName || "Student"}.`;
  }

  // Dynamic credit indicator
  let creditsDisplay = "5 Credits";
  let creditsColor = "text-violet-600";
  if (status === "completed") {
    if (isLearner) {
      creditsDisplay = "-5 Credits";
      creditsColor = "text-red-600 font-semibold";
    } else {
      creditsDisplay = "+10 Credits";
      creditsColor = "text-emerald-600 font-semibold";
    }
  }

  const handleCardClick = () => {
    navigate(`/session-details/${id}`);
  };

  return (
    <section
      onClick={handleCardClick}
      className="cursor-pointer rounded-3xl border border-violet-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            {isStarted ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1.5 text-xs font-bold text-emerald-800">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                In Progress
              </span>
            ) : (
              <span
                className={`rounded-full px-4 py-1.5 text-xs font-semibold ${currentStatus.badge}`}
              >
                {currentStatus.text}
              </span>
            )}

            {status === "completed" && isMentor && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                <Sparkles size={13} />
                Teaching Reward Earned
              </span>
            )}
          </div>

          {/* Topic */}
          <h2 className="mt-4 text-2xl font-bold text-slate-900">
            {topic}
          </h2>

          <p className="mt-1 text-sm font-medium text-violet-700">
            {roleSubtitle}
          </p>

          {/* Session Information */}
          <div className="mt-5 flex flex-wrap gap-6 text-slate-600">
            {/* Participant */}
            <div className="flex items-center gap-2 text-sm">
              <User size={18} className="text-violet-600" />
              <span>
                {isLearner
                  ? `Mentor: ${mentor}`
                  : `Learner: ${session.learnerName || "Student"}`}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays size={18} className="text-violet-600" />
              {date}
            </div>

            {/* Time */}
            <div className="flex items-center gap-2 text-sm">
              <Clock3 size={18} className="text-violet-600" />
              {time}
            </div>

            {/* Credits */}
            <div className="flex items-center gap-2 text-sm">
              <Coins size={18} className="text-violet-600" />
              <span className={creditsColor}>{creditsDisplay}</span>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="rounded-2xl bg-violet-50 px-6 py-5 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">
            Duration
          </p>

          <p className="mt-1 text-xl font-bold text-violet-700">
            {duration}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        {/* IN PROGRESS */}
        {isStarted && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/session-room/${id}`);
            }}
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-emerald-700 hover:scale-105"
          >
            <Radio size={18} className="animate-pulse" />
            Enter Live Session
          </button>
        )}

        {/* UPCOMING (not started) */}
        {!isStarted && status === "upcoming" && (
          <>
            {isBeforeStart ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/session-room/${id}`);
                }}
                className="cursor-pointer rounded-xl bg-violet-100 px-6 py-3 font-semibold text-violet-700 transition-all hover:bg-violet-200"
                title={`Session starts at ${startTimeDisplay}`}
              >
                Starts at {startTimeDisplay}
              </button>
            ) : isMentor ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/session-room/${id}`);
                }}
                className="cursor-pointer rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-700 shadow-sm"
              >
                Start Session
              </button>
            ) : (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/session-room/${id}`);
                }}
                className="cursor-pointer rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition-all hover:bg-violet-700 shadow-sm"
              >
                Join Session
              </button>
            )}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/reschedule-session/${id}`);
              }}
              className="cursor-pointer rounded-xl border border-violet-200 px-5 py-3 font-semibold text-violet-700 transition-all hover:bg-violet-50"
            >
              Reschedule
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setIsCancelModalOpen(true);
              }}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 transition-all hover:bg-red-50"
            >
              <X size={16} />
              Cancel Session
            </button>
          </>
        )}

        {/* PENDING */}
        {status === "pending" && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/session-details/${id}`);
              }}
              className="cursor-pointer rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition-all hover:bg-amber-600"
            >
              View Request
            </button>

            {isLearner && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsCancelRequestModalOpen(true);
                }}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-red-200 px-6 py-3 font-semibold text-red-600 transition-all hover:bg-red-50"
              >
                <X size={16} />
                Cancel Request
              </button>
            )}
          </>
        )}

        {/* COMPLETED */}
        {status === "completed" && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/session-notes/${id}`);
              }}
              className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700"
            >
              <FileText size={16} />
              View Notes
            </button>

            {/* ONLY THE LEARNER CAN LEAVE A REVIEW */}
            {isLearner && (
              hasReview ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/review-session/${id}`);
                  }}
                  className="cursor-pointer rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 font-semibold text-emerald-700 transition-all hover:bg-emerald-100"
                >
                  Review Submitted
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/review-session/${id}`);
                  }}
                  className="cursor-pointer rounded-xl border border-violet-200 bg-violet-50 px-6 py-3 font-semibold text-violet-700 transition-all hover:bg-violet-100"
                >
                  Leave Review
                </button>
              )
            )}

            {isLearner && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/request-session/${session.mentorId}`);
                }}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-violet-200 px-5 py-3 font-semibold text-violet-700 transition-all hover:bg-violet-50"
              >
                <RotateCcw size={16} />
                Book Again
              </button>
            )}
          </>
        )}

        {/* CANCELLED */}
        {status === "cancelled" && isLearner && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/book-again/${id}`);
            }}
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition-all hover:bg-violet-700 shadow-sm"
          >
            <RotateCcw size={16} />
            Book Again
          </button>
        )}

        {/* REJECTED */}
        {status === "rejected" && isLearner && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              navigate("/explore");
            }}
            className="cursor-pointer rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition-all hover:bg-violet-700 shadow-sm"
          >
            Explore Mentors
          </button>
        )}
      </div>

      <CancelSessionModal
        session={session}
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
      />

      <CancelRequestModal
        session={session}
        isOpen={isCancelRequestModalOpen}
        onClose={() => setIsCancelRequestModalOpen(false)}
      />
    </section>
  );
};

export default SessionCard;