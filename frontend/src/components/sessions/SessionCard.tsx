import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  Coins,
  User,
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
    credits,
    status,
    learnerId,
  } = session;
  const navigate = useNavigate();
  const { currentUser, reviews } = useSessions();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelRequestModalOpen, setIsCancelRequestModalOpen] = useState(false);

  const isLearner = currentUser.id === learnerId;
  const hasReview = reviews.some((r) => r.sessionId === id);
  const isBeforeStart = isSessionBeforeStart(date, time);
  const startTimeDisplay = formatStartTimeOnly(time);

  const currentStatus = statusStyles[status];

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
          {/* Status */}
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${currentStatus.badge}`}
          >
            {currentStatus.text}
          </span>

          {/* Topic */}
          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            {topic}
          </h2>

          {/* Session Information */}
          <div className="mt-5 flex flex-wrap gap-6 text-slate-600">
            {/* Mentor */}
            <div className="flex items-center gap-2">
              <User
                size={18}
                className="text-violet-600"
              />

              {mentor}
            </div>

            {/* Date */}
            <div className="flex items-center gap-2">
              <CalendarDays
                size={18}
                className="text-violet-600"
              />

              {date}
            </div>

            {/* Time */}
            <div className="flex items-center gap-2">
              <Clock3
                size={18}
                className="text-violet-600"
              />

              {time}
            </div>

            {/* Credits */}
            <div className="flex items-center gap-2">
              <Coins
                size={18}
                className="text-violet-600"
              />

              {credits} Credits
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="rounded-2xl bg-violet-50 px-6 py-5 text-center">
          <p className="text-sm text-slate-500">
            Duration
          </p>

          <p className="mt-2 text-xl font-bold text-violet-700">
            {duration}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">
        {/* Upcoming */}
        {status === "upcoming" && (
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
            ) : (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/session-room/${id}`);
                }}
                className="cursor-pointer rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition-all hover:bg-violet-700"
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
              className="cursor-pointer rounded-xl border border-violet-200 px-6 py-3 font-semibold text-violet-700 transition-all hover:bg-violet-50"
            >
              Reschedule
            </button>
          </>
        )}

        {/* Pending */}
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

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setIsCancelRequestModalOpen(true);
              }}
              className="cursor-pointer rounded-xl border border-red-200 px-6 py-3 font-semibold text-red-600 transition-all hover:bg-red-50"
            >
              Cancel Request
            </button>
          </>
        )}

        {/* Completed */}
        {status === "completed" && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/session-notes/${id}`);
              }}
              className="cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700"
            >
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
                  className="cursor-pointer rounded-xl border border-violet-200 px-6 py-3 font-semibold text-violet-700 transition-all hover:bg-violet-50"
                >
                  Leave Review
                </button>
              )
            )}
          </>
        )}

        {/* Cancelled */}
        {status === "cancelled" && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/book-again/${id}`);
            }}
            className="cursor-pointer rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition-all hover:bg-violet-700"
          >
            Book Again
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